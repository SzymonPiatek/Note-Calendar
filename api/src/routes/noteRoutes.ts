import { Router } from "express";
import {
  getAllNotesHandler,
  getNoteByIdHandler,
} from "../handlers/note/getHandlers";

const router = Router();

router.get("/all", getAllNotesHandler);
router.get("/id/:id", getNoteByIdHandler);

export default router;
