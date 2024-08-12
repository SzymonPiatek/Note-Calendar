import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";

export async function editNoteHandler(req: Request, res: Response) {
  try {
    const noteId: number = parseInt(req.params.id);
    const { statusId } = req.body as {
      statusId: number;
    };

    if (isNaN(noteId)) {
      return res.json({ success: false, message: "Invalid note ID" });
    }

    const existingNote: Note | null = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!existingNote) {
      return res.json({ success: true, message: "Note not found" });
    }

    const updatedNote: Note = await prisma.note.update({
      where: { id: noteId },
      data: {
        statusId: statusId ?? existingNote.statusId,
      },
    });

    return res.json({
      success: true,
     note: updatedNote,
    });
  } catch (err) {
    returnError(res, err);
  }
}
