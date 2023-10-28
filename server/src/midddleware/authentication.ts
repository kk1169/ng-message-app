import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { get, merge } from "lodash";
import { IUser } from "../models";
import "dotenv/config";
import { HttpCodes, Messages } from "../common/messages";
import { UserEntity } from "../entity/UserEntity";

const SECRET_KEY = process.env.JWT_TOKEN_SECRET as string;
const COOKIE_AUTH = process.env.COOKIE_AUTH as string;

export const generateToken = (data: IUser) => {
  const token = sign(data, SECRET_KEY, {
    expiresIn: "2 days",
  });
  return token;
};

export const getUserByToken = async (token: string) => {
  const user = await verify(token, SECRET_KEY);
  if (!user) {
    return null;
  }
  return user;
};

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[COOKIE_AUTH];
    if (!sessionToken) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: Messages.UNAUTHORIZED });
    }

    const user: IUser = await verify(sessionToken, SECRET_KEY) as IUser;
    if (!user) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: Messages.UNAUTHORIZED });
    }

    const checkTokenValid = await isUserTokenValid(user.email, sessionToken);
    if (!checkTokenValid) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: Messages.UNAUTHORIZED });
    }

    merge(req, { identity: user });
    return next();
  } catch (error) {
    return res
      .status(HttpCodes.UNAUTHORIZED)
      .json({ message: Messages.UNAUTHORIZED });
  }
};


const isUserTokenValid = async (email: string, token: string) => {
  const user = await UserEntity.findOne({
    where: {
      email,
      token
    },
    select: {
      id: true,
      name: true,
      email: true,
      token: true
    },
  });

  if (user) {
    console.log(user);

    return true;
  }
  return false;
}
