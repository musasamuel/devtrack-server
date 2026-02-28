import {Router,} from "express";
import {register} from "../controllers/auth.controller"
import { login } from "../controllers/auth.controller";

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login)
export default authRouter
