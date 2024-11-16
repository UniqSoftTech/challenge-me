import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const checkValid = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), message: "Validation failed" });
  }

  next();
};
