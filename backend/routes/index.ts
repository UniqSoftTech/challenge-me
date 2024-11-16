import { Router } from 'express';
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';

const router = Router();
const room = new RoomController()
const user = new UserController();

/** user */
router.post('/user', user.create);

/** room */
router.post('/room', room.create);

export default router;