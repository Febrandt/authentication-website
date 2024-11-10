import { NextFunction, Request, Response } from "express";
import { User } from "../../modules/user/user.model";

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
  }

export const notFound = (req: Request,res: Response,next: NextFunction) => {

    res.status(404).render('404',{user: req.session.user});

}