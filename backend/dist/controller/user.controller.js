"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const _index_1 = __importDefault(require("../models/_index"));
class UserController {
    constructor() {
        this.create = async (req, res) => {
            try {
                await _index_1.default.Users.create(req.body);
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
            }
        };
    }
}
exports.UserController = UserController;
