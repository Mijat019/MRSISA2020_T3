import db from './database';
import { Model, INTEGER } from 'sequelize';
import Users from './Users';
import Clinics from './Clinics';

class AdminAt extends Model {
  public userId!: number;
  public clinicId!: number;
}

AdminAt.init(
  {
    clinicId: {
      type: INTEGER.UNSIGNED,
      unique: false,
      allowNull: false,
    },
    userId: {
      type: INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    sequelize: db,
    tableName: 'admin_at',
    version: true,
  }
);

// one user can have one row in AdminAt table
AdminAt.belongsTo(Users, { as: 'user', foreignKey: 'userId' });

// one clinic can have many rows in AdminAt table
AdminAt.belongsTo(Clinics, { as: 'clinic', foreignKey: 'clinicId' });

export default AdminAt;
