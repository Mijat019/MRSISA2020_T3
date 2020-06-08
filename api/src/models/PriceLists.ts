import { Model, INTEGER, DOUBLE, STRING } from 'sequelize';
import db from './database';
import Clinics from './Clinics';
import AppointmentTypes from './AppointmentTypes';

class PriceLists extends Model {
  public id!: number;
  public price!: number;
  public clinicId!: number;
  public appointmentTypeId!: number;
  public version!: number;
}

PriceLists.init(
  {
    clinicId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    appointmentTypeId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
    },

    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    price: {
      type: DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'price_lists',
    version: true,
    indexes: [{ unique: true, fields: ['clinicId', 'appointmentTypeId'] }],
    sequelize: db,
  }
);

PriceLists.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });

PriceLists.belongsTo(AppointmentTypes, {
  as: 'appointmentType',
  foreignKey: 'appointmentTypeId',
});

Clinics.hasMany(PriceLists, {
  as: 'priceLists',
  foreignKey: 'clinicId',
});

AppointmentTypes.hasMany(PriceLists, {
  as: 'priceList',
  foreignKey: 'appointmentTypeId',
});

export default PriceLists;
