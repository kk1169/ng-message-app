import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../entity/UserEntity";
import { generateToken, getUserByToken } from "../midddleware/authentication";
import { IUser } from "../models";
import "dotenv/config";
import { HttpCodes, Messages } from "../common/messages";

const COOKIE_AUTH = process.env.COOKIE_AUTH as string;

class AuthController {

  // login
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check User exists
      const user = await UserEntity.findOne({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
        },
      });

      if (!user) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: Messages.INCORRECT_EMAIL_PASSWORD });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: Messages.INCORRECT_EMAIL_PASSWORD });
      }

      const data: IUser = {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = generateToken(data);
      user.token = token;
      await user.save();

      res.cookie(COOKIE_AUTH, token);
      return res.status(HttpCodes.OK).json({
        message: Messages.USER_LOGGED_IN_SUCCESS,
        data,
        token,
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  // register
  public async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // Check User exists
      const isUserExists = await UserEntity.find({
        where: {
          email,
        },
      });

      console.log(isUserExists);


      if (isUserExists.length > 0) {
        return res
          .status(HttpCodes.BAD_REQUEST)
          .json({ message: Messages.EMAIL_ALREADY_REGISTER });
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      const user = UserEntity.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await user.save();

      return res
        .status(HttpCodes.CREATED)
        .json({ message: Messages.USER_CREATED_SUCCESS, user });
    } catch (error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ error });
    }
  }

  // logout
  public async logout(req: Request, res: Response) {
    const { email } = (await getUserByToken(req.cookies[COOKIE_AUTH])) as IUser;

    const user = await UserEntity.findOne({
      where: {
        email,
      },
    });

    if (user) {
      user.token = "";
      user.save();
    }

    res.cookie(COOKIE_AUTH, "");
    return res.status(HttpCodes.OK).json({
      message: Messages.USER_LOGGED_OUT_SUCCESS,
    });
  }
}

export default new AuthController();
