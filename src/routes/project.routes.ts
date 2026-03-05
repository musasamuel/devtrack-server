import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import  { project, projects, singleProject } from "../controllers/project.controller";

const projectRouter = Router();
projectRouter.post("/", authenticate, project)
projectRouter.get("/", authenticate, projects)
projectRouter.get("/:id", authenticate, singleProject)
export default projectRouter