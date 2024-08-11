import { Request, Response } from "express";
import { hashPassword } from "../../modules/authModule";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { User } from "@prisma/client";

export async function registerHandler(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      isActive = false,
      isSuperuser = false,
    }: User = req.body;

    const isEmailAlreadyExist: User | null = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailAlreadyExist) {
      return res.json({ success: false, message: "Email already in use" });
    }

    const hashedPassword: string = await hashPassword(password);

    const newUser: User = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isActive,
        isSuperuser,
      },
    });

    return res.json({ success: true, message: "User created", user: newUser });
  } catch (error) {
    returnError(res, error);
  }
}
