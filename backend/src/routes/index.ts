import { Router } from "express";
import authRouter from "./auth.routes";
import usersRouter from "./users.routes";
import { authenticate } from "../middleware/authenticator";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authenticate, usersRouter);

export default router;
