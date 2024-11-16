import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/db.config';

interface UserAttr {
  id: number;
  wallet: string;
}

interface UserCreateAttr extends Optional<UserAttr, 'id' | 'wallet'> { }

class User extends Model<UserAttr, UserCreateAttr> implements UserAttr {
  public id!: number;
  public wallet!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    wallet: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    sequelize,
    tableName: 'c_users',
    timestamps: false
  }
);

export default User;
