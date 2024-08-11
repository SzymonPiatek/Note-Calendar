import { Router } from "express";
import { registerHandler } from "../handlers/auth/register";

const router = Router();

router.post("/register", registerHandler);

export default router;
