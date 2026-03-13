import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addMember, getMember } from "../controllers/member.controller";

const memberRouter = Router();
memberRouter.post("/:id/members", authenticate, addMember);
memberRouter.get("/:id/members", authenticate, getMember);
export default memberRouter;