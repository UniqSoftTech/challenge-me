"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const _index_1 = __importDefault(require("../models/_index"));
class RoomController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { name } = req.body;
                const data = await _index_1.default.ChatRoom.create({
                    name,
                    created_by: 1,
                    created_at: new Date(),
                });
                res.status(200).send(data);
            }
            catch (error) {
                return res.status(500).send(error);
            }
        };
    }
}
exports.RoomController = RoomController;
