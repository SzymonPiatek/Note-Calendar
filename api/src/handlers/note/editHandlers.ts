import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";
import {
  dbToStatus,
  dbToLevel,
  Level,
  levelToDb,
  Status,
  statusToDb,
  statusDisplay,
  levelDisplay,
} from "../../utils/note";

export async function editNoteHandler(req: Request, res: Response) {
  try {
    const noteId: number = parseInt(req.params.id);
    const { status, level } = req.body as {
      status?: string;
      level?: string;
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

    if (status && statusDb === undefined) {
      return res.json({ success: false, message: "Invalid status value" });
    }

    if (level && levelDb === undefined) {
      return res.json({ success: false, message: "Invalid level value" });
    }

    const updatedNote: Note = await prisma.note.update({
      where: { id: noteId },
      data: {
        status: statusDb ?? existingNote.status,
        level: levelDb ?? existingNote.level,
      },
    });

    const statusValue = updatedNote.status;
    const levelValue = updatedNote.level;

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
