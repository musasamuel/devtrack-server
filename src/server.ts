import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./lib/prisma";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import projectRouter from "./routes/project.routes";
import taskRouter from "./routes/task.routes";
import memberRouter from "./routes/member.routes";
import activityRouter from "./routes/activity.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ["http://localhost:5173", "https://devtrack-client-b64n.vercel.app"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/projects", memberRouter);
app.use("/api/projects", activityRouter);
app.use("/api/tasks", taskRouter);

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