import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";
import {
  dbToStatus,
  dbToLevel,
  dbToCategory,
  Level,
  Category,
  levelToDb,
  categoryToDb,
  Status,
  statusToDb,
  statusDisplay,
  levelDisplay,
  categoryDisplay,
} from "../../utils/note";

export async function editNoteHandler(req: Request, res: Response) {
  try {
    const noteId: number = parseInt(req.params.id);
    const { status, level, category } = req.body as {
      status?: string;
      level?: string;
      category?: string;
    };

    if (isNaN(noteId)) {
      return res.json({ success: false, message: "Invalid note ID" });
    }

    const existingNote: Note | null = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!existingNote) {
      return res.json({ success: false, message: "Note not found" });
    }

    const statusDb = status ? statusToDb[status as Status] : undefined;
    const levelDb = level ? levelToDb[level as Level] : undefined;
    const categoryDb = category
      ? categoryToDb[category as Category]
      : undefined;

    if (status && statusDb === undefined) {
      return res.json({ success: false, message: "Invalid status value" });
    }

    if (level && levelDb === undefined) {
      return res.json({ success: false, message: "Invalid level value" });
    }

    if (category && categoryDb === undefined) {
      return res.json({ success: false, message: "Invalid category value" });
    }

    const updatedNote: Note = await prisma.note.update({
      where: { id: noteId },
      data: {
        status: statusDb ?? existingNote.status,
        level: levelDb ?? existingNote.level,
        category: categoryDb ?? existingNote.category,
      },
    });

    const statusValue = updatedNote.status;
    const levelValue = updatedNote.level;
    const categoryValue = updatedNote.category;

    const responseNote = {
      ...updatedNote,
      status: {
        id: statusValue,
        value: dbToStatus[updatedNote.status],
        displayName: statusDisplay[dbToStatus[statusValue]],
      },
      level: {
        id: levelValue,
        value: dbToLevel[updatedNote.level],
        displayName: levelDisplay[dbToLevel[levelValue]],
      },
      category: {
        id: categoryValue,
        value: dbToCategory[updatedNote.category],
        displayName: categoryDisplay[dbToCategory[categoryValue]],
      },
    };

    return res.json({
      success: true,
      message: "Note edited",
      note: responseNote,
    });
  } catch (err) {
    returnError(res, err);
  }
}
