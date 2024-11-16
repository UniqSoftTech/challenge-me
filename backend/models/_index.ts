import sequelize from '../configs/db.config';
import Users from './user';

const db = {
  sequelize,
  Users
};

export default db;
