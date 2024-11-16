import { Request, Response } from 'express';
import db from '../models/_index';

export class RoomController {

  create = async (req: any, res: any) => {
    try {
      const { name } = req.body
      const data = await db.ChatRoom.create({
        name,
        created_by: 1,
        created_at: new Date(),
      });
      res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
