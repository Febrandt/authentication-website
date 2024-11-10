import { NextFunction, Request, Response } from "express";
import { User } from "../../modules/user/user.model";

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
  }

export const isUserVerified =  (req: Request, res: Response, next: NextFunction) => {

   if (req.session.user!.verified) {
        next();
   } else {
        res.status(403).redirect('/verification/input-page');
   }  
}

export const isUserNotVerified =  (req: Request, res: Response, next: NextFunction) => {

    if (!req.session.user!.verified) {
         next();
    } else {
         res.status(403).redirect('/');
    }  
 }


export const isUserAdmin =  (req: Request, res: Response, next: NextFunction) => {
    
    if (req.session.user!.admin) {
        next();
    } else {
        res.status(403).redirect('/');
    }
    
}

export const isUserLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/login')
    }
}

export const isUserNotLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        next();
    } else {
        res.status(403).send('Forbidden!');
    }
}