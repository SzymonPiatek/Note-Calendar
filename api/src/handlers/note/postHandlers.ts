import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";
import {
  dbToLevel,
  dbToStatus,
  Level,
  levelDisplay,
  levelToDb,
  Status,
  statusDisplay,
  statusToDb,
} from "../../utils/note";

export async function postNoteHandler(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      status: statusKey,
      level: levelKey,
      userId,
    } = req.body;

    const statusDb = statusToDb[statusKey as Status];
    const levelDb = levelToDb[levelKey as Level];

    if (statusDb === undefined) {
      return res.json({ success: false, message: "Invalid status value" });
    }

    if (levelDb === undefined) {
      return res.json({ success: false, message: "Invalid level value" });
    }

    if (userId !== null) {
      const isUserExist = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!isUserExist) {
        return res.json({ success: false, message: "User not found" });
      }
    }

    if (userId === null) {
      return res.json({ success: false, message: "User is required" });
    }

    const newNote: Note = await prisma.note.create({
      data: {
        name,
        description,
        startDate,
        endDate,
        status: statusDb,
        level: levelDb,
        userId,
      },
    });

    const statusValue = newNote.status;
    const levelValue = newNote.level;

    const responseNote = {
      ...newNote,
      status: {
        id: statusValue,
        value: dbToStatus[newNote.status],
        displayName: statusDisplay[dbToStatus[statusValue]],
      },
      level: {
        id: levelValue,
        value: dbToLevel[newNote.level],
        displayName: levelDisplay[dbToLevel[levelValue]],
      },
    };

    return res.json({
      success: true,
      message: "Note created",
      note: responseNote,
    });
  } catch (error) {
    returnError(res, error);
  }
}
