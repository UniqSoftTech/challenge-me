import { Request, Response } from 'express';
import db from '../models/_index';

export class RoomController {

  create = async (req: any, res: any) => {
    try {
      const { name } = req.body
      const data = await db.Room.create({
        name,
        created_by: 1,
        created_at: new Date(),
      });
      res.status(200).send(data);
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  getUserRooms = async (req: any, res: any) => {
    try {
      await db.RoomMember.findAll({ where: { user_id: req?.user?.id }, include: [{ model: db.Room, as: 'room' }] });
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
