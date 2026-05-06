import { Router } from "express";
import {
    getMe,
  login,
  logout,
  refresh,
  register,
} from "../controllers/auth.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { registerSchema } from "../shared/schemas/RegisterSchema";
import { LoginSchema } from "../shared/schemas/LoginSchema";
import { authenticate } from "../middleware/authenticator";

const authRouter = Router();

authRouter.post("/register", schemaValidator(registerSchema), register);
authRouter.post("/login", schemaValidator(LoginSchema), login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);
authRouter.post("/me", authenticate, getMe);

export default authRouter;
