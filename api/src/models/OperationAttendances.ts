import { Model, INTEGER } from 'sequelize';
import sequelize from './database';
import DoctorAt from './DoctorAt';
import Operations from './Operations';

class OperationAttendances extends Model {
  public id!: number;
  public doctorId!: number;
  public operationId!: number;
}

OperationAttendances.init(
  {
    id: {
      type: INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },

    doctorId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },

    operationId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'operation_attendances',
    timestamps: false,
    indexes: [{ fields: ['operationId'], unique: false }],
  }
);

DoctorAt.hasMany(OperationAttendances, {
  as: 'operationAttendances',
  foreignKey: 'doctorId',
});
OperationAttendances.belongsTo(DoctorAt, {
  as: 'doctor',
  foreignKey: 'doctorId',
});

Operations.hasMany(OperationAttendances, {
  as: 'operationAttendances',
  foreignKey: 'operationId',
});
OperationAttendances.belongsTo(Operations, {
  as: 'operation',
  foreignKey: 'operationId',
});

export default OperationAttendances;
