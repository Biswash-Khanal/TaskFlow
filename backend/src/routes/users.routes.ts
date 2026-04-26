import { Router } from "express";
import { deleteUser, getUser, postUser } from "../controllers/users.controller";

const usersRouter = Router();

usersRouter.get("/", getUser);
usersRouter.post("/", postUser);
usersRouter.delete("/", deleteUser);

export default usersRouter;
