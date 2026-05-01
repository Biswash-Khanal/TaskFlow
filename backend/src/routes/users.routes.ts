import { Router } from "express";
import {
  deleteUser,
  getUsers,
  postUser,
} from "../controllers/users.controller";
import { authenticate } from "../middleware/authenticator";

const usersRouter = Router();

usersRouter.get("/", authenticate, getUsers);
usersRouter.post("/", postUser);
usersRouter.delete("/", deleteUser);

export default usersRouter;
