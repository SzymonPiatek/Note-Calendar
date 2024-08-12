import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { comparePassword } from "../../modules/authModule";
import { returnError } from "../../utils/error";
import { prisma } from "../../index";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    const user: User | null = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!user.isActive) {
      return res.json({ success: false, message: "User is not active" });
    }

    const isPasswordMatch: boolean = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }

    const token: string = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    returnError(res, error);
  }
}
