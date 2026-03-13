import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addActivity, getActivity } from "../controllers/activity.controller";

const activityRouter = Router();
activityRouter.post("/:id/activity", authenticate, addActivity);
activityRouter.get("/:id/activity", authenticate, getActivity);
export default activityRouter;