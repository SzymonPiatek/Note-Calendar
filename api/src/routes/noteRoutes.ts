import { Router } from "express";
import {
  getAllNotesHandler,
  getNoteByIdHandler,
} from "../handlers/note/getHandlers";
import { postNoteHandler } from "../handlers/note/postHandlers";
import { deleteNoteHandler } from "../handlers/note/deleteHandlers";

const router = Router();

router.get("/all", getAllNotesHandler);
router.get("/id/:id", getNoteByIdHandler);
router.post("/", postNoteHandler);
router.delete("/:id", deleteNoteHandler);

export default router;
