import { Request, Response } from 'express';
import db from '../models/_index';

export class ChallengeController {
  create = async (req: any, res: any) => {
    try {
      const { question } = req.body

      const data = await db.Challenge.create({ challenge: question, created_by: req?.user?.id, created_at: new Date() });
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  getByUserId = async (req: any, res: any) => {
    try {

      const data = await db.Challenge.findAll({ where: { created_by: req?.user?.id } });
      res.status(200).send({ status: true, data });
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}
