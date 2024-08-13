import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { Note } from "@prisma/client";
import { prisma } from "../..";

export async function postNoteHandler(req: Request, res: Response) {
  try {
    const { name, description, startDate, endDate, statusId, levelId, userId }: Note =
      req.body;

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
        statusId,
        levelId,
        userId,
      },
    });

    return res.json({ success: true, message: "Note created", note: newNote });
  } catch (error) {
    returnError(res, error);
  }
}
