import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import  { user } from "../controllers/user.controller";

const userRouter = Router();
userRouter.get("/profile", authenticate, user );
export default userRouter



