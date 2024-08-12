import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { NoteLevel } from "@prisma/client";

export async function getAllNoteLevelHandler(req: Request, res: Response) {
  try {
    const noteLevels: NoteLevel[] = await prisma.noteLevel.findMany();
    const countNoteLevels: number = await prisma.noteLevel.count();

    return res.json({ success: true, count: countNoteLevels, noteLevels });
  } catch (error) {
    returnError(res, error);
  }
}

export async function getNoteLevelByIdHandler(req: Request, res: Response) {
  try {
    const noteLevelId: number = parseInt(req.params.id);

    if (isNaN(noteLevelId)) {
      return res.json({ success: false, message: "Invalid note level ID" });
    }

    const existingNoteLevel: NoteLevel | null = await prisma.noteLevel.findUnique({
      where: { id: noteLevelId },
    });

    return res.json({
      success: true,
      message: existingNoteLevel ? "Note level found" : "Note level not found",
      user: existingNoteLevel,
    });
  } catch (err) {
    returnError(res, err);
  }
}
