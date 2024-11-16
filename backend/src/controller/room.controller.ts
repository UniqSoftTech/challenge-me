import { Request, Response } from 'express';
import db from '../models/_index';

export class RoomController {
  create = async (req: any, res: any) => {
    try {
      const { name } = req.body

      const data = await db.Room.create({ name: name, created_by: req?.user?.id, created_at: new Date() });
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  get = async (req: any, res: any) => {
    try {

      const data = await db.Room.findAll({});
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  getUserRooms = async (req: any, res: Response) => {
    try {
      const myCreatedRooms = await db.Room.findAll({ where: { created_by: req?.user?.id } });
      const myJoinedRooms = await db.RoomMember.findAll({ where: { user_id: req?.user?.id }, include: [{ model: db.Room, as: 'room' }] });

      let data = myCreatedRooms;

      await Promise.all(myJoinedRooms.map((x: any) => {
        const item = x.toJSON();
        data.push(item.room);
      }))

      res.status(200).json({ status: true, data });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }
}
