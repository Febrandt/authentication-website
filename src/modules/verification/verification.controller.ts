import { Request, Response } from "express"
import { User } from "../user/user.model";
import { deletePinMapRegister, sendVerificationEmail } from "./verification.service";

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
}

const SUCCESS_PAGE = 'verification-success';
const INPUT_PAGE = 'verification-input';

export const checkpin = async (req: Request, res: Response) => {

    const pin = parseInt(req.params.pin);

    if (!deletePinMapRegister(pin, req.session.user!.email)){
        res.status(400).json({error: 'Pin or user email invalid.'})
        return
    }

    try {

        await User.update({verified: true},{where: {id: req.session.user!.id}})
        req.session.user!.verified = true;

        res.status(200).json({message:'User Verified!'})

    }catch( error ){
        res.status(500).json({error: `Server or Session error ${error.message}`})
    }

}

export const directLink = async (req: Request, res: Response) => {

    const pin: number = parseInt(req.params.pin)

    if (!deletePinMapRegister(pin, req.session.user!.email)){
        res.status(404)
        return
    }

    try {

        await User.update({verified: true},{where: {id: req.session.user!.id}})
        req.session.user!.verified = true;

        res.render(SUCCESS_PAGE,{user: req.session.user!})

    } catch(error) {
        res.status(404)
    }
    
}

export const inputPage = (req: Request, res:Response) => {
    
    try {
        sendVerificationEmail(req.session.user!.email)

        res.render(INPUT_PAGE,{user: req.session.user})

    } catch (error) {
        res.status(404)
    }
}

export const successPage = (req: Request, res:Response) => {    
    res.render(SUCCESS_PAGE,{user: req.session.user})

}