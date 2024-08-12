import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { NoteLevel } from "@prisma/client";
import { prisma } from "../..";

export async function postNoteLevelHandler(req: Request, res: Response) {
  try {
    const { name }: NoteLevel = req.body;

    const newNoteLevels: NoteLevel = await prisma.noteLevel.create({
      data: {
        name,
      },
    });

    return res.json({
      success: true,
      message: "Note level created",
      noteLevel: newNoteLevels,
    });
  } catch (error) {
    returnError(res, error);
  }
}
