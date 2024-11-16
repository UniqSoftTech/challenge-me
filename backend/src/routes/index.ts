import { Router } from 'express';

import * as v from "../validation/validation"
import { authenticate } from '../middlware/auth.middlware';
import { RoomController } from '../controller/room.controller';
import { UserController } from '../controller/user.controller';
import { checkValid } from '../middlware/validation.middleware';
import { OpenAIController } from '../controller/open-ai.controller';
import { ContractController } from '../controller/contract.controller';
import { RoomMemberController } from '../controller/room-member.controller';

const router = Router();

const room = new RoomController()
const user = new UserController();
const openai = new OpenAIController();
const contract = new ContractController();
const roomMember = new RoomMemberController();

/** user */
router.post('/user', v.createUser, checkValid, user.create);
router.post('/user/signin', v.signin, checkValid, user.signin);
router.put('/user', authenticate, v.updateUser, checkValid, user.put);

/** room */
router.get('/room', authenticate, room.get);
router.post('/room', authenticate, room.create);
router.get('/room/user', authenticate, room.getUserRooms);

/** room member */
router.post('/room-member/join', authenticate, v.joinRoom, checkValid, roomMember.joinRoom);

/** contract */
router.post('/contract/abi-json', authenticate, contract.getABI);
router.post('/contract/tnx-info', authenticate, contract.getTnxData);
router.get('/contract/get-bets', authenticate, contract.getMarketInfo);
router.post('/contract/vote', authenticate, v.vote, checkValid, contract.vote);
router.post('/contract/search-token', authenticate, contract.getTokensBySearch);
router.post('/contract/placeBet', authenticate, v.placeBet, checkValid, contract.placeBet);
router.post('/contract/createMarket', authenticate, v.createMarket, checkValid, contract.createMarket);
router.post('/contract/claimWinnings', authenticate, v.claimWinnings, checkValid, contract.claimWinnings);


/** openai */
router.post("/openai/check-challengable", authenticate, v.isChallengeable, checkValid, openai.checkChallengeable);

export default router;