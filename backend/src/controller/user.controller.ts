import db from "../models/_index";
import { Request, Response } from 'express';
import { generateToken, getTokenToUserId } from "../utils/jwt.utils";

export class UserController {
  create = async (req: Request, res: Response) => {
    try {
      const { proof, age, name, height, weight, birthday, relationship_status, wallet } = req.body;

      const user = await db.Users.create({ proof, age, name, height, weight, birthday, relationship_status, wallet });
      const token = generateToken(user);
      res.status(201).json({ message: 'User created successfully', status: true, data: { user, token } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  signin = async (req: any, res: any) => {
    try {
      const { wallet } = req.body;
      const user = await db.Users.findOne({ where: { wallet } });

      if (!user)
        return res.status(404).json({ message: 'User not found', status: false });

      const token = generateToken(user);
      res.status(200).json({ status: true, data: { user, token } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  put = async (req: any, res: any) => {
    try {
      const userId = req?.user?.id;
      const user = await db.Users.findByPk(userId);

      if (!user)
        return res.status(404).json({ message: 'User not found' });

      user.proof = req.body.proof;
      user.age = req.body.age;
      user.name = req.body.name;
      user.height = req.body.height;
      user.weight = req.body.weight;
      user.birthday = req.body.birthday;
      user.relationship_status = req.body.relationship_status;

      await user.save();
      res.status(201).json({ message: 'User updated successfully', status: true, data: user });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
}