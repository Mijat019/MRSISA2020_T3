import Users, { usersSelect } from '../models/Users';
import UserRole from '../models/UserRole';
import UsersService from './UsersService';
import DoctorAt from '../models/DoctorAt';
import Clinics from '../models/Clinics';
import DoctorSpec from '../models/DoctorSpec';
import AppointmentTypes from '../models/AppointmentTypes';
import RatingsService from './RatingsService';
import FreeAppointments from '../models/FreeAppointments';
import ConfirmedAppointments from '../models/ConfirmedAppointments';
import moment from 'moment';
import { Op } from 'sequelize';
import DoctorRating from '../models/DoctorRating';
import sequelize from 'sequelize';
import Operations from '../models/Operations';
import LeaveRequests from '../models/LeaveRequests';
import OperationAttendances from '../models/OperationAttendances';

class DoctorsService {
    public async getAll(clinicId?: any): Promise<any> {
        let where = {};
        if (clinicId) {
            // Defined, get only for one clinic
            where = { clinicId };
        }
        const doctors = await DoctorAt.findAll({
            where,
            group: 'doctorId',
            attributes: [
                [
                    sequelize.fn(
                        'avg',
                        sequelize.col('ratingList.averageRating')
                    ),
                    'rating',
                ],
                'clinicId',
                'userId',
            ],
            include: [
                {
                    model: Users,
                    attributes: usersSelect,
                    as: 'user',
                    required: true,
                },
                {
                    model: Clinics,
                    attributes: ['name'],
                    as: 'clinic',
                    required: true,
                },
                {
                    model: DoctorRating,
                    as: 'ratingList',
                    attributes: ['averageRating'],
                    required: true,
                },
                {
                    model: DoctorSpec,
                    required: true,
                    attributes: ['id'],
                    as: 'spec',
                    include: [
                        {
                            model: AppointmentTypes,
                            required: true,
                            attributes: ['id', 'name'],
                            as: 'appoType',
                        },
                    ],
                },
            ],
        });

        return doctors;
    }

    public async getByClinicId(clinicId: number): Promise<any> {
        return await this.getAll(clinicId);
    }

    /**
     * Gets all doctors for appo type and their available hours for appointment
     */
    //TODO: Pogledaj zasto se date ne koristi
    public async getAllForScheduling(
        clinicId: any,
        appointmentTypeId: any,
        date: any
    ) {
        const doctors = (await DoctorAt.findAll({
            include: [
                {
                    model: Users,
                    attributes: usersSelect,
                    as: 'user',
                    required: true,
                },
                {
                    model: Clinics,
                    attributes: ['id', 'name'],
                    where: { id: clinicId },
                    as: 'clinic',
                    required: true,
                },
                {
                    model: DoctorSpec,
                    attributes: [],
                    as: 'spec',
                    where: { appointmentTypeId },
                    required: true,
                },
            ],
        })) as any;

        // get average rating of clinic
        for (let doctor of doctors) {
            doctor.dataValues.rating = await RatingsService.getRatingForDoctor(
                doctor.userId
            );
        }

        return doctors;
    }

    public async add(doctorPayload: any, clinicId: number): Promise<any> {
        // Create user
        const { id: userId } = await UsersService.createEmployee(
            doctorPayload,
            UserRole.DOCTOR
        );

        // Link with clinic
        await DoctorAt.create({ userId, clinicId });
        const doctor = await DoctorAt.findByPk(userId, {
            include: [
                { model: Users, attributes: usersSelect, as: 'user' },
                { model: Clinics, attributes: ['name'], as: 'clinic' },
            ],
        });
        return doctor;
    }

    public async addSpecialization(userId: number, appointmentTypeId: number) {
        await DoctorSpec.create({
            userId,
            appointmentTypeId,
        });

        const spec: any = await DoctorSpec.findOne({
            where: { userId, appointmentTypeId },
            include: [
                {
                    model: AppointmentTypes,
                    attributes: ['id', 'name'],
                    as: 'appoType',
                },
            ],
            attributes: ['id'],
        });

        return spec;
    }

    public async deleteSpecialization(
        userId: number,
        appointmentTypeId: number
    ) {
        await DoctorSpec.destroy({
            where: { userId, appointmentTypeId },
        });
    }

    /** Returns a list of all available times for doctor given the date */
    public async getAvailableTimes(doctorId: any, date: any) {
        date = moment.unix(date);

        // generate all possible times
        let allTimes = ['09:00', '09:30'];
        for (let i = 10; i < 17; i++) {
            allTimes.push(i + ':' + '00');
            allTimes.push(i + ':' + '30');
        }

        // set time bounds
        // (min = date at 9AM, max = date at 5PM)
        const minTime = date.clone().set({ hour: 9, minute: 0, second: 0 });
        const maxTime = date.clone().set({ hour: 17, minute: 0, second: 0 });

        //get all free Appos
        const freeApps = await FreeAppointments.findAll({
            where: {
                doctorId,
                start: {
                    [Op.between]: [minTime.unix(), maxTime.unix()],
                },
            },
        });

        // delete busy times
        this.parseApposAndDeleteTimes(freeApps, allTimes);

        //get all conf appos
        const confApps = await ConfirmedAppointments.findAll({
            where: {
                doctorId,
                start: {
                    [Op.between]: [minTime.unix(), maxTime.unix()],
                },
            },
        });

        // delete busy times
        this.parseApposAndDeleteTimes(confApps, allTimes);

        console.log(allTimes);
        return allTimes;
    }

    public parseApposAndDeleteTimes(appos: any, times: any): any {
        for (let app of appos) {
            const formatted = moment.unix(app.start).format('HH:mm');
            const idx = times.indexOf(formatted);
            if (idx >= 0) times.splice(idx, 1);
        }
    }

    public async delete(doctorId: number) {
        // This will fail on foreign key reference if they have free appos or confirmed appos
        await DoctorAt.destroy({ where: { userId: doctorId } });
        await Users.destroy({ where: { id: doctorId } });
    }

    /**
     * Returns a list of available doctors for a given time
     * @param clinicId
     * @param start
     */
    public async getAvailableDoctors(clinicId: string, start: string) {
        const doctorsWithFreeAppos = await FreeAppointments.findAll({
            attributes: ['doctorId'],
            where: { clinicId, start },
        });
        let busyDoctorIds = await doctorsWithFreeAppos.map((t) => t.doctorId);

        const doctorsWithConfirmedAppos = await ConfirmedAppointments.findAll({
            attributes: ['doctorId'],
            where: { clinicId, start },
        });
        busyDoctorIds = busyDoctorIds.concat(
            doctorsWithConfirmedAppos.map((t) => t.doctorId)
        );

        const doctorsWithOperations = await Operations.findAll({
            where: { clinicId, start },
            attributes: ['doctorId'],
        });
        busyDoctorIds = busyDoctorIds.concat(
            doctorsWithOperations.map((t) => t.doctorId)
        );

        const doctorsWithLeave = await LeaveRequests.findAll({
            attributes: ['userId'],
            where: {
                clinicId,
                from: { [Op.lt]: start },
                to: { [Op.gt]: start },
            },
        });
        busyDoctorIds = busyDoctorIds.concat(
            doctorsWithLeave.map((t) => t.userId)
        );

        const doctorsWithAttendance: any = await OperationAttendances.findAll({
            attributes: ['id'],
            include: [
                {
                    model: Operations,
                    as: 'operation',
                    attributes: ['doctorId'],
                    where: { start, clinicId },
                    required: true,
                },
            ],
        });
        busyDoctorIds = busyDoctorIds.concat(
            doctorsWithAttendance.map((t: any) => t.operation.doctorId)
        );

        const availableDoctors = DoctorAt.findAll({
            attributes: ['userId'],
            where: { clinicId, userId: { [Op.notIn]: busyDoctorIds } },
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['firstName', 'lastName', 'email'],
                    required: true,
                },
            ],
        });
        return availableDoctors;
    }
}

export default new DoctorsService();
