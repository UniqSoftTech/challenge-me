import sequelize from '../configs/db.config';
import Users from './user';
import Room from "./room";
import RoomMember from "./room-members";

Room.hasMany(RoomMember, { foreignKey: 'room_id', as: 'members' });
RoomMember.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

const db = {
  sequelize,
  Users,
  Room,
  RoomMember
};

export default db;
