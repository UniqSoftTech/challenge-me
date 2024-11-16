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

  put = async (req: any, res: Response) => {
    try {
      const user = await db.Users.findByPk(req.user.id);

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