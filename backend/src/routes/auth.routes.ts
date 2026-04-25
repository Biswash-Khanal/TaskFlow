import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { schemaValidator } from "../middleware/schemaValidator";

import { userSchema } from "../schemas/validators/users.validators";

const authRouter = Router();

authRouter.post("/register", schemaValidator(userSchema), register);
authRouter.post("/login", register);

export default authRouter;
