import { DataTypes } from 'sequelize';
import { db } from '../data/connection';

export const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
}, {
  timestamps: false,
});
