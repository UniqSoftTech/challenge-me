import db from "../models/_index";
import { Request, Response } from 'express';
import { generateToken } from "../utils/jwt.utils";

export class UserController {
  create = async (req: Request, res: Response) => {
    try {
      const user = await db.Users.create(req.body);
      const token = generateToken(user);
      res.status(201).json({ message: 'User created successfully', status: true, data: { user, token } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
}