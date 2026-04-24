import { Router } from "express";
import { register } from "../controllers/Users Controllers/usersController";

const router = Router();

router.post("/", register);

export default router;
