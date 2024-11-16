import sequelize from '../configs/db.config';
import Users from './user';
import ChatRoom from "./room";
import RoomMember from "./room-members";

const db = {
  sequelize,
  Users,
  ChatRoom,
  RoomMember
};

export default db;
