import { Router } from 'express';
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';
import { RoomMemberController } from '../controller/room-member.controller';
import { authenticate } from '../middlware/auth.middlware';

const router = Router();
const room = new RoomController()
const user = new UserController();
const roomMember = new RoomMemberController();

/** user */
router.post('/user', user.create);
// router.put('/user', user.put);

/** room */
router.post('/room', room.create);

/** room member */
router.post('/room-member', roomMember.create);

export default router;