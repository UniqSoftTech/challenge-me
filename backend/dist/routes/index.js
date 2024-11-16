"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_1 = require("../controller/room.controller");
const user_controller_1 = require("../controller/user.controller");
const room_member_controller_1 = require("../controller/room-member.controller");
const router = (0, express_1.Router)();
const room = new room_controller_1.RoomController();
const user = new user_controller_1.UserController();
const roomMember = new room_member_controller_1.RoomMemberController();
/** user */
router.post('/user', user.create);
/** room */
router.post('/room', room.create);
/** room member */
router.post('/room-member', roomMember.create);
exports.default = router;
