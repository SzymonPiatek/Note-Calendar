import { Router } from "express";
import { registerHandler } from "../handlers/auth/register";
import { loginHandler } from "../handlers/auth/login";
import { checkUserHandler } from "../handlers/auth/checkUser";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/check-user", checkUserHandler);

export default router;
