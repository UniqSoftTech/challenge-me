import { Router } from 'express';

import * as v from "../validation/validation"
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';
import { RoomMemberController } from '../controller/room-member.controller';
import { authenticate } from '../middlware/auth.middlware';
import { checkValid } from '../middlware/validation.middleware';

const router = Router();

const room = new RoomController()
const user = new UserController();
const roomMember = new RoomMemberController();

/** user */
router.post('/user', v.createUser, checkValid, user.create);
router.post('/user/signin', v.signin, checkValid, user.signin);
router.put('/user', authenticate, v.updateUser, checkValid, user.put);

/** room */
router.post('/room', room.create);
router.get('/user-rooms', authenticate, room.getUserRooms);

/** room member */
router.post('/room-member', roomMember.create);
export default router;