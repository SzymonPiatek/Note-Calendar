import { Request, Response } from "express";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { User } from "@prisma/client";

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const users: User[] = await prisma.user.findMany();
    const countUsers: number = await prisma.user.count();

    return res.json({ success: true, count: countUsers, users });
  } catch (error) {
    returnError(res, error);
  }
}

export async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const userId: number = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.json({ success: false, message: "Invalid user ID" });
    }

    const existingUser: User | null = await prisma.user.findUnique({
      where: { id: userId },
    });

    return res.json({
      success: true,
      message: existingUser ? "User found" : "User not found",
      user: existingUser,
    });
  } catch (err) {
    returnError(res, err);
  }
}

export async function getUserByEmailHandler(req: Request, res: Response) {
  try {
    const userEmail: string = req.params.email;
    const existingUser: User | null = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    return res.json({
      success: true,
      message: existingUser ? "User found" : "User not found",
      user: existingUser,
    });
  } catch (err) {
    returnError(res, err);
  }
}
