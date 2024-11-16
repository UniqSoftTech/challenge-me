import jwt from 'jsonwebtoken';
import { auth_key } from '../config/env.config';

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, auth_key);
  } catch (error) {
    return null;
  }
};

export function generateToken(user: any) {
  return jwt.sign(user, auth_key);
};

export function getTokenToUserId(req: any) {
  const token = req.headers.authorization?.split(' ')[1];
  const user = token && verifyToken(token);

  return user?.id || null;
}