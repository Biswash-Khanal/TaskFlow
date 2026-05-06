import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import { schemaValidator } from "../middleware/schemaValidator";
import { registerSchema } from "../shared/schemas/RegisterSchema";
import { LoginSchema } from "../shared/schemas/LoginSchema";

const authRouter = Router();

authRouter.post("/register", schemaValidator(registerSchema), register);
authRouter.post("/login", schemaValidator(LoginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
