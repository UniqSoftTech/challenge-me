"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../configs/db.config"));
class User extends sequelize_1.Model {
}
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    wallet: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, {
    sequelize: db_config_1.default,
    tableName: 'c_users',
    timestamps: false
});
exports.default = User;
