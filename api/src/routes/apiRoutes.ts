import express from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import noteRoutes from "./noteRoutes";
import noteStatusRoutes from "./noteStatusRoutes";
import noteLevelRoutes from "./noteLevelRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/note", noteRoutes);
router.use("/noteStatus", noteStatusRoutes);
router.use("/noteLevel", noteLevelRoutes);

export default router;
