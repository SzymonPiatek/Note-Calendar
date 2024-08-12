import { Router } from "express";
import {
  getAllNoteStatusHandler,
  getNoteStatusByIdHandler,
} from "../handlers/noteStatus/getHandlers";

const router = Router();

router.get("/all", getAllNoteStatusHandler);
router.get("/id/:id", getNoteStatusByIdHandler);

export default router;
