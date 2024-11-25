import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';

export function authenticate(req: any, res: any, next: any) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "unauthorized" });

    const user = verifyToken(token);
    if (!user) return res.status(403).json({ message: "unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}