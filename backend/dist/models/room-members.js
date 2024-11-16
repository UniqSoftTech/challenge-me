"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
class RoomMember extends sequelize_1.Model {
}
RoomMember.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    room_id: { type: sequelize_1.DataTypes.NUMBER, allowNull: false },
    user_id: { type: sequelize_1.DataTypes.NUMBER, allowNull: false },
}, {
    sequelize: db_config_1.default,
    tableName: 'c_room_members',
    timestamps: false
});
exports.default = RoomMember;
