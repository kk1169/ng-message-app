import { UserEntity } from "../entity/UserEntity";
import { Request, Response } from "express";

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserEntity.find({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new UserController();
