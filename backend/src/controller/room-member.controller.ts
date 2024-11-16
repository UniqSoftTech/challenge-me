import db from "../models/_index";
import { Request, Response } from 'express';

export class RoomMemberController {
  create = async (req: Request, res: Response) => {
    try {
      const { room_id, user_id } = req.body;
      await db.RoomMember.create({ room_id, user_id });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}