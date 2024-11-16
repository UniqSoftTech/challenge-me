import { ReqUser } from './req.user';

declare global {
  namespace Express {
    interface Request {
      user?: ReqUser;
    }
  }
}