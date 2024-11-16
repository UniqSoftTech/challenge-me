import db from "../models/_index";
import { Request, Response } from 'express';

export class UserController {
  create = async (req: Request, res: Response) => {
    try {
      await db.Users.create(req.body);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}