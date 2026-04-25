import { Router } from "express";
import { register } from "../controllers/Users Controllers/users.controller";

const router = Router();

router.post("/", register);

export default router;
