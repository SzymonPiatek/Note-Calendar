import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { Note } from "@prisma/client";
import {
  dbToLevel,
  dbToStatus,
  dbToCategory,
  levelDisplay,
  statusDisplay,
  categoryDisplay,
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
      category: {
        id: note.category,
        value: dbToCategory[note.category],
        displayName: categoryDisplay[dbToCategory[note.category]],
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

    if (!existingNote) {
      return res.json({ success: false, message: "Note not found" });
    }

    const statusValue = existingNote.status;
    const levelValue = existingNote.level;
    const categoryValue = existingNote.category;

    const responseNote = {
      ...existingNote,
      status: {
        id: statusValue,
        value: dbToStatus[existingNote.status],
        displayName: statusDisplay[dbToStatus[statusValue]],
      },
      level: {
        id: levelValue,
        value: dbToLevel[existingNote.level],
        displayName: levelDisplay[dbToLevel[levelValue]],
      },
      category: {
        id: categoryValue,
        value: dbToCategory[existingNote.category],
        displayName: categoryDisplay[dbToCategory[categoryValue]],
      },
    };

    return res.json({
      success: true,
      message: "Note found",
      note: responseNote,
    });
  } catch (err) {
    returnError(res, err);
  }
}
