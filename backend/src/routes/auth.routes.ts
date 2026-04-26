import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { schemaValidator } from "../middleware/schemaValidator";

import { registerSchema } from "../schemas/validators/auth.validators";

const authRouter = Router();

authRouter.post("/register", schemaValidator(registerSchema), register);
authRouter.post("/login", register);

export default authRouter;
