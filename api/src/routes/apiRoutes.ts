import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import noteRoutes from "./noteRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/note", noteRoutes);

export default router;
