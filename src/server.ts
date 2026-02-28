import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./lib/prisma";
import authRouter from "./routes/auth.routes";


dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter)

app.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      message: "DevTrack API Running 🚀",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});