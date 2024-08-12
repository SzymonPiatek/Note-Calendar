import { Router } from "express";
import {
  getAllNoteStatusHandler,
  getNoteStatusByIdHandler,
} from "../handlers/noteStatus/getHandlers";
import { postNoteStatusHandler } from "../handlers/noteStatus/postHandlers";

const router = Router();

router.get("/all", getAllNoteStatusHandler);
router.get("/id/:id", getNoteStatusByIdHandler);
router.post("/", postNoteStatusHandler);

export default router;
