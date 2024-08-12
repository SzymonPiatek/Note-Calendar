import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { NoteStatus } from "@prisma/client";

export async function getAllNoteStatusHandler(req: Request, res: Response) {
  try {
    const noteStatuses: NoteStatus[] = await prisma.noteStatus.findMany();
    const countNoteStatuses: number = await prisma.noteStatus.count();

    return res.json({ success: true, count: countNoteStatuses, noteStatuses });
  } catch (error) {
    returnError(res, error);
  }
}

export async function getNoteStatusByIdHandler(req: Request, res: Response) {
  try {
    const noteStatusId: number = parseInt(req.params.id);

    if (isNaN(noteStatusId)) {
      return res.json({ success: false, message: "Invalid note status ID" });
    }

    const existingNoteStatus: NoteStatus | null =
      await prisma.noteStatus.findUnique({
        where: { id: noteStatusId },
      });

    return res.json({
      success: true,
      message: existingNoteStatus
        ? "Note status found"
        : "Note status not found",
      ntoestatus: existingNoteStatus,
    });
  } catch (err) {
    returnError(res, err);
  }
}
