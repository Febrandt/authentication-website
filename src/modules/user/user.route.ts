import { Router } from "express";
import { register, login, logout } from "./user.controller";
import { isUserLoggedIn } from "../../shared/middlewares/session.middleware";

const userRouter = Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", isUserLoggedIn, logout)




export default userRouter;