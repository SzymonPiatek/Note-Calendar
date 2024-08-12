import { Router } from "express";
import {
  getAllNotesHandler,
  getNoteByIdHandler,
} from "../handlers/note/getHandlers";
import { postNoteHandler } from "../handlers/note/postHandlers";

const router = Router();

router.get("/all", getAllNotesHandler);
router.get("/id/:id", getNoteByIdHandler);
router.post("/", postNoteHandler);

export default router;
