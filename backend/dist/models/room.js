"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
class ChatRoom extends sequelize_1.Model {
}
ChatRoom.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    created_by: { type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    created_at: { type: sequelize_1.DataTypes.DATE, allowNull: false }
}, {
    sequelize: db_config_1.default,
    tableName: 'c_chat_rooms',
    createdAt: "created_at",
    updatedAt: false
});
exports.default = ChatRoom;
