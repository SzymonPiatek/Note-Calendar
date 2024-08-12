import { Router } from "express";
import {
  getAllNoteLevelHandler,
  getNoteLevelByIdHandler,
} from "../handlers/noteLevel/getHandlers";
import { postNoteLevelHandler } from "../handlers/noteLevel/postHandlers";

const router = Router();

router.get("/all", getAllNoteLevelHandler);
router.get("/id/:id", getNoteLevelByIdHandler);
router.post("/", postNoteLevelHandler);

export default router;
