import { Request, Response } from 'express';
import db from '../models/_index';

export class RoomController {
  create = async (req: any, res: any) => {
    try {
      const { name } = req.body

      await db.Room.create({ name: name, created_by: req?.user?.id, created_at: new Date() });
      res.status(200).send({ status: true });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  get = async (req: any, res: any) => {
    try {

      const data = await db.Room.findAll();
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  getUserRooms = async (req: any, res: any) => {
    try {
      const data = await db.Room.findAll({ where: { created_by: req?.user?.id }, include: [{ model: db.RoomMember, as: 'members' }] });
      res.status(200).json({ status: true, data });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
