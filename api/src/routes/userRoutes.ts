import { Router } from "express";
import {
  getAllUsersHandler,
  getUserByEmailHandler,
  getUserByIdHandler,
} from "../handlers/user/getHandlers";

const router = Router();

router.get("/all", getAllUsersHandler);
router.get("/id/:id", getUserByIdHandler);
router.get("/email/:email", getUserByEmailHandler);

export default router;
