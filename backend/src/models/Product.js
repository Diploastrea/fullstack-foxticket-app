import { DataTypes } from 'sequelize';
import { db } from '../data/connection';

export const Product = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNul: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNul: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNul: false,
  },
}, {
  timestamps: false,
});
