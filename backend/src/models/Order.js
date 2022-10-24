import { DataTypes } from 'sequelize';
import { db } from '../data/connection';
import { User } from './User';
import { Product } from './Product';

export const Order = db.define('order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
}, {
  timestamps: true,
  createdAt: 'orderDate',
  updatedAt: false,
});
