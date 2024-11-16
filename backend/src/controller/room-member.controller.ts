import db from "../models/_index";
import { Request, Response } from 'express';

export class RoomMemberController {
  joinRoom = async (req: any, res: any) => {
    try {
      const { room_id } = req.body;
      const room = await db.Room.findOne({ where: { id: room_id } });

      if (room?.created_by === req?.user?.id)
        return res.status(200).json({ status: false, message: "You can't join your own room" });

      const isJoined = await db.RoomMember.findOne({ where: { room_id, user_id: req?.user?.id } });

      if (isJoined !== null)
        return res.status(200).json({ status: false, message: "Already joined this room" });

      await db.RoomMember.create({ room_id, user_id: req?.user?.id });
      res.status(200).json({ status: true });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error, status: false });
    }
  }
}