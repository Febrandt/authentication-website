import { Router } from "express";
import { checkpin, directLink, inputPage, successPage} from "./verification.controller";
import { isUserLoggedIn, isUserNotVerified, isUserVerified } from "../../shared/middlewares/session.middleware";

const verificationRouter = Router()

verificationRouter.post('/checkpin/:pin', isUserLoggedIn,isUserNotVerified, checkpin);
verificationRouter.get('/directlink/:pin', isUserLoggedIn,isUserNotVerified, directLink)
verificationRouter.get('/success', isUserVerified, successPage)
verificationRouter.get('/input', isUserLoggedIn,isUserNotVerified, inputPage)

export default verificationRouter;