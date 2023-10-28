import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";
import TestController from "../controllers/TestController";
import { authentication } from "../midddleware/authentication";

export const apiRouter = Router();

// test
apiRouter.get("/", TestController.index);
apiRouter.get("/test", TestController.test);

// auth
apiRouter.post("/auth/register", AuthController.register);
apiRouter.post("/auth/login", AuthController.login);
apiRouter.get("/auth/logout", authentication, AuthController.logout);

// user
apiRouter.get("/users", authentication, UserController.getAllUsers);
