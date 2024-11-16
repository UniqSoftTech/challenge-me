import { Router } from 'express';

import * as v from "../validation/validation"
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';
import { RoomMemberController } from '../controller/room-member.controller';
import { authenticate } from '../middlware/auth.middlware';
import { checkValid } from '../middlware/validation.middleware';
import { ContractController } from '../controller/contract.controller';

const router = Router();

const room = new RoomController()
const user = new UserController();
const roomMember = new RoomMemberController();
const contract = new ContractController();

/** user */
router.post('/user', v.createUser, checkValid, user.create);
router.post('/user/signin', v.signin, checkValid, user.signin);
router.put('/user', authenticate, v.updateUser, checkValid, user.put);

/** room */
router.post('/room', authenticate, room.create);
router.get('/room', authenticate, room.get);
router.get('/user-rooms', authenticate, room.getUserRooms);

/** room member */
router.post('/room-member/join', authenticate, v.joinRoom, checkValid, roomMember.joinRoom);

/** contract */
router.post('/contract/claimWinnings', authenticate, v.claimWinnings, checkValid, contract.claimWinnings);
router.post('/contract/createMarket', authenticate, v.createMarket, checkValid, contract.createMarket);
router.post('/contract/placeBet', authenticate, v.placeBet, checkValid, contract.placeBet);
router.post('/contract/vote', authenticate, v.vote, checkValid, contract.vote);

export default router;