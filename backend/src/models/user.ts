import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/db.config';

interface UserAttr {
  id: number;
  wallet: string;
  proof: string;
  age: number;
  name: string;
  height: number;
  weight: number;
  birthday: Date;
  relationship_status: string;
}

interface UserCreateAttr extends Optional<UserAttr, 'id' | 'wallet'> { }

class User extends Model<UserAttr, UserCreateAttr> implements UserAttr {
  public id!: number;
  public wallet!: string;
  public proof!: string;
  public age!: number;
  public name!: string;
  public height!: number;
  public weight!: number;
  public birthday!: Date;
  public relationship_status!: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    wallet: { type: DataTypes.STRING, allowNull: false, unique: true },
    proof: { type: DataTypes.STRING, allowNull: true },
    age: { type: DataTypes.NUMBER, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    height: { type: DataTypes.NUMBER, allowNull: true },
    weight: { type: DataTypes.NUMBER, allowNull: true },
    birthday: { type: DataTypes.DATE, allowNull: true },
    relationship_status: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'c_users',
    timestamps: false
  }
);

export default User;
