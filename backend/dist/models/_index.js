"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("../configs/db.config"));
const user_1 = __importDefault(require("./user"));
const room_1 = __importDefault(require("./room"));
const room_members_1 = __importDefault(require("./room-members"));
const db = {
    sequelize: db_config_1.default,
    Users: user_1.default,
    ChatRoom: room_1.default,
    RoomMember: room_members_1.default
};
exports.default = db;
