import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/db.config';

interface ChatRoomAttr {
  id: number;
  name: string;
  created_by: number;
  created_at: Date;
}

interface ChatRoomCreateAttr extends Optional<ChatRoomAttr, "id"> { }

class Room extends Model<ChatRoomAttr, ChatRoomCreateAttr> implements ChatRoomAttr {
  public id!: number;
  public name!: string;
  public created_by!: number;
  public readonly created_at!: Date;
}

Room.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    created_by: { type: DataTypes.NUMBER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false }
  },
  {
    sequelize,
    tableName: 'c_chat_rooms',
    createdAt: "created_at",
    updatedAt: false
  }
);

export default Room;
