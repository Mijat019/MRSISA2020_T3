import AppointmentTypes from '../models/AppointmentTypes'


class AppointmentTypesService {

    public async getAll(): Promise<any> {
        return await AppointmentTypes.findAll({});
    }

    public async add(typePayload: any): Promise<any> {
        if(await this.get(typePayload.name))
            throw new Error('Appointment type with that name already exists!');

        await AppointmentTypes.create({ name: typePayload.name, price: typePayload.price});
        return await this.get(typePayload.name);
    }

    public async update(typePayload: any): Promise<any> {
        
        // if try to change name to already
        // existing appointment type
        const oldType = await this.get(typePayload.name);
        if(oldType && oldType.id != typePayload.id){
            throw new Error('Appointment type with that name already exists!');
        }

        await AppointmentTypes.update(typePayload, { where: { id : typePayload.id } });
        return await await this.get(typePayload.name);
    }

    public async get(typeName : string): Promise<any> {
        return await AppointmentTypes.findOne({ where: { name : typeName } }); 
    }


    public async delete(typePayload: any) {
        await AppointmentTypes.destroy({ where: { id: typePayload.id } });
    }
}

export default new AppointmentTypesService();
