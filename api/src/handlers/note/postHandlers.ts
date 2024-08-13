import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";
import {
  dbToLevel,
  dbToStatus,
  dbToCategory,
  Level,
  Category,
  levelDisplay,
  levelToDb,
  Status,
  statusDisplay,
  statusToDb,
  categoryDisplay,
  categoryToDb,
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
      category: categoryKey,
      userId,
    } = req.body;

    const statusDb = statusToDb[statusKey as Status];
    const levelDb = levelToDb[levelKey as Level];
    const categoryDb = categoryToDb[categoryKey as Category];

    if (statusDb === undefined) {
      return res.json({ success: false, message: "Invalid status value" });
    }

    if (levelDb === undefined) {
      return res.json({ success: false, message: "Invalid level value" });
    }

    if (categoryDb === undefined) {
      return res.json({ success: false, message: "Invalid category value" });
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
        category: categoryDb,
        userId,
      },
    });

    const statusValue = newNote.status;
    const levelValue = newNote.level;
    const categoryValue = newNote.category;

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
      category: {
        id: categoryValue,
        value: dbToCategory[newNote.category],
        displayName: categoryDisplay[dbToCategory[categoryValue]],
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
