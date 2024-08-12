import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { NoteStatus } from "@prisma/client";
import { prisma } from "../..";

export async function postNoteStatusHandler(req: Request, res: Response) {
  try {
    const { name }: NoteStatus = req.body;

    const newNoteStatus: NoteStatus = await prisma.noteStatus.create({
      data: {
        name,
      },
    });

    return res.json({
      success: true,
      message: "Note status created",
      note: newNoteStatus,
    });
  } catch (error) {
    returnError(res, error);
  }
}
