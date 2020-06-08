import Users, { usersSelect } from '../models/Users';
import UserRole from '../models/UserRole';
import UsersService from './UsersService';
import DoctorAt from '../models/DoctorAt';
import Clinics from '../models/Clinics';
import AdminAt from '../models/AdminAt';
import DoctorSpec from '../models/DoctorSpec';
import AppointmentTypes from '../models/AppointmentTypes';
import RatingsService from './RatingsService';

class DoctorsService {
  public async getAll(): Promise<any> {
    const doctors = await DoctorAt.findAll({
      include: [
        { model: Users, attributes: usersSelect, as: 'user' },
        { model: Clinics, attributes: ['name'], as: 'clinic' },
        {
          model: DoctorSpec,
          attributes: ['id'],
          as: 'spec',
          include: [
            {
              model: AppointmentTypes,
              attributes: ['id', 'name'],
              as: 'appoType',
            },
          ],
        },
      ],
    });
    return doctors;
  }

  public async getByClinicId(clinicId: number, userId: number): Promise<any> {
    // Does the user id match the admin of this clinic?
    const adminAt = await AdminAt.findOne({ where: { userId, clinicId } });
    // if (adminAt == null) {
    //   // Given user is NOT an admin of this clinic or either of them don't exist
    //   throw "Given user " + _userId + " is not an admin of clinic " + _clinicId;
    // }

    const doctors = await DoctorAt.findAll({
      where: { clinicId },
      include: [
        { model: Users, attributes: usersSelect, as: 'user' },
        { model: Clinics, attributes: ['name'], as: 'clinic' },
        {
          model: DoctorSpec,
          attributes: ['id'],
          as: 'spec',
          include: [
            {
              model: AppointmentTypes,
              attributes: ['id', 'name'],
              as: 'appoType',
            },
          ],
        },
      ],
    });

    return doctors;
  }

  /**
   * Gets all doctors for appo type and their available hours for appointment
   */
  public async getAllForScheduling(
    clinicId: any,
    appointmentTypeId: any,
    date: any
  ) {
    const doctors = (await DoctorAt.findAll({
      include: [
        { model: Users, attributes: usersSelect, as: 'user', required: true },
        {
          model: Clinics,
          attributes: [],
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
        { model: AppointmentTypes, attributes: ['id', 'name'], as: 'appoType' },
      ],
      attributes: ['id'],
    });

    return spec;
  }

  public async deleteSpecialization(userId: number, appointmentTypeId: number) {
    await DoctorSpec.destroy({
      where: { userId, appointmentTypeId },
    });
  }

  /**
   * OVO TREBA DA SE ISPRAVI DA PROVERAVA DA LI DOKTOR IMA ZAKAZANE PREGLEDE
   * ILI DODELJENE SLOBODNE PREGLEDE
   */
  public async delete(doctorId: number) {
    await DoctorAt.destroy({ where: { userId: doctorId } });
    await Users.destroy({ where: { id: doctorId } });
  }
}

export default new DoctorsService();
