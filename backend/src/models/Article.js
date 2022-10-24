import { DataTypes } from 'sequelize';
import { db } from '../data/connection';

export const Article = db.define('article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  content: {
    type: DataTypes.STRING(510),
    allowNul: false,
  },
}, {
  timestamps: true,
  createdAt: true,
  updatedAt: true,
});
