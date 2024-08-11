import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import apiRoutes from "./routes/apiRoutes";

export const prisma = new PrismaClient();

const app = express();
const port = process.env.BACKEND_PORT;
const frontendPort = process.env.FRONTEND_PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(
  cors({
    origin: `http://${host}:${frontendPort}`,
    methods: "GET,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello from backend!");
});

app.use("/api/v1", apiRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
