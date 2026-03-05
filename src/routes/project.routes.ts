import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import  { project } from "../controllers/project.controller";

const projectRouter = Router();
projectRouter.post("/", authenticate, project)
export default projectRouter