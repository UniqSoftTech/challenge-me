import { Router } from 'express';
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';
import { RoomMemberController } from '../controller/room-member.controller';

const router = Router();
const room = new RoomController()
const user = new UserController();
const roomMember = new RoomMemberController();

/** user */
router.post('/user', user.create);

/** room */
router.post('/room', room.create);

/** room member */
router.post('/room-member', roomMember.create);

export default router;