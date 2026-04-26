import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { schemaValidator } from "../middleware/schemaValidator";

import { loginSchema, registerSchema } from "../schemas/validators/auth.validators";

const authRouter = Router();

authRouter.post("/register", schemaValidator(registerSchema), register);
authRouter.post("/login", schemaValidator(loginSchema), login);

export default authRouter;
