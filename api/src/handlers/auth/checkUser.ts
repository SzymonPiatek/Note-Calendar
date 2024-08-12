import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { User } from "@prisma/client";

export async function checkUserHandler(req: Request, res: Response) {
  try {
    const { userId } = req.body as { userId: number };

    if (isNaN(userId)) {
      return res.json({ success: false, message: "Invalid user ID" });
    }

    const isUserExist: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    return res.json({
      success: true,
      message: isUserExist ? "User exist" : "User not exist",
      exists: !!isUserExist,
    });
  } catch (error) {
    returnError(res, error);
  }
}
