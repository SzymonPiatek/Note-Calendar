import { Router } from "express";
import { registerHandler } from "../handlers/auth/register";
import { loginHandler } from "../handlers/auth/login";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);

export default router;
