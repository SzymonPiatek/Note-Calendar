import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";

export async function deleteNoteHandler(req: Request, res: Response) {
  try {
    const noteId: number = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.json({ success: false, message: "Invalid note ID" });
    }

    const isExist: Note | null = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!isExist) {
      return res.json({ success: false, message: "Note not found" });
    }

    const daletedNote: Note = await prisma.note.delete({
      where: { id: noteId },
    });

    return res.json({
      success: true,
      message: "Note deleted",
      note: daletedNote,
    });
  } catch (error) {
    returnError(res, error);
  }
}
