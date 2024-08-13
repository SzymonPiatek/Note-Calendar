import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { Note } from "@prisma/client";
import {
  dbToLevel,
  dbToStatus,
  levelDisplay,
  statusDisplay,
} from "../../utils/note";

export async function getAllNotesHandler(req: Request, res: Response) {
  try {
    const notes: Note[] = await prisma.note.findMany({
      include: {
        user: true,
      },
    });
    const countNotes: number = await prisma.note.count();

    const transformedNotes = notes.map((note) => ({
      ...note,
      status: {
        id: note.status,
        value: dbToStatus[note.status],
        displayName: statusDisplay[dbToStatus[note.status]],
      },
      level: {
        id: note.level,
        value: dbToLevel[note.level],
        displayName: levelDisplay[dbToLevel[note.level]],
      },
    }));

    return res.json({
      success: true,
      count: countNotes,
      notes: transformedNotes,
    });
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

    const statusValue = existingNote ? existingNote.status : null;
    const levelValue = existingNote ? existingNote.level : null;

    const responseNote = {
      ...existingNote,
      status: {
        id: existingNote!.status,
        value: dbToStatus[existingNote!.status],
        displayName: statusDisplay[dbToStatus[statusValue!]],
      },
      level: {
        id: existingNote!.level,
        value: dbToLevel[existingNote!.level],
        displayName: levelDisplay[dbToLevel[levelValue!]],
      },
    };

    return res.json({
      success: true,
      message: existingNote ? "Note found" : "Note not found",
      note: existingNote ? responseNote : null,
    });
  } catch (err) {
    returnError(res, err);
  }
}
