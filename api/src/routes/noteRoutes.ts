import { Router } from "express";
import {
  getAllNotesHandler,
  getNoteByIdHandler,
} from "../handlers/note/getHandlers";
import { postNoteHandler } from "../handlers/note/postHandlers";
import { deleteNoteHandler } from "../handlers/note/deleteHandlers";
import { editNoteHandler } from "../handlers/note/editHandlers";

const router = Router();

router.get("/all", getAllNotesHandler);
router.get("/id/:id", getNoteByIdHandler);
router.post("/", postNoteHandler);
router.delete("/:id", deleteNoteHandler);
router.patch("/:id", editNoteHandler);

export default router;
