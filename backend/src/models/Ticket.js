import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { User } from './User';

export const Ticket = db.define('ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'not active',
  },
  paidDate: {
    type: DataTypes.DATE,
  },
  expirationDate: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  productName: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  createdAt: 'paidDate',
  updatedAt: false,
});
