import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { Note } from "@prisma/client";

export async function getAllNotesHandler(req: Request, res: Response) {
  try {
    const notes: Note[] = await prisma.note.findMany({
      include: {
        user: true,
      },
    });
    const countNotes: number = await prisma.note.count();

    return res.json({ success: true, count: countNotes, notes });
  } catch (error) {
    returnError(res, error);
  }
}

export async function getNoteByIdHandler(req: Request, res: Response) {
  try {
    const noteId: number = parseInt(req.params.id);

    if (isNaN(noteId)) {
      return res.json({ success: false, message: "Invalid note ID" });
    }

    const existingNote: Note | null = await prisma.note.findUnique({
      where: { id: noteId },
      include: {
        user: true,
      },
    });

    return res.json({
      success: true,
      message: existingNote ? "Note found" : "Note not found",
      user: existingNote,
    });
  } catch (err) {
    returnError(res, err);
  }
}
