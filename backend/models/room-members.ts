import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/db.config';

interface RoomMembersAttr {
  id: number;
  room_id: number;
  user_id: number;
}

interface CreateAttr extends Optional<RoomMembersAttr, "id"> { }

class RoomMember extends Model<RoomMembersAttr, CreateAttr> implements RoomMembersAttr {
  public id!: number;
  public room_id!: number;
  public user_id!: number;
}

RoomMember.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    room_id: { type: DataTypes.NUMBER, allowNull: false },
    user_id: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'c_room_members',
    timestamps: false
  }
);

export default RoomMember;
