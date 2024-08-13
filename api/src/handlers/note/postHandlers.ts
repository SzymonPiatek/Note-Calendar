import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";
import { Level, levelToDb, Status, statusToDb } from "../../utils/note";

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

    const responseNote = {
      ...newNote,
      status: statusKey,
      level: levelKey,
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
