import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { task, completeTask } from "../controllers/task.controller";

const taskRouter = Router();
taskRouter.post("/", authenticate, task);
taskRouter.patch("/:id", authenticate, completeTask);

export default taskRouter;