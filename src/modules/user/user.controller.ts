import { User } from "./user.model";
import { Request, Response } from 'express';
import { compare, hash } from "bcrypt";


declare module 'express-session' {
    interface SessionData {
      user: User;
    }
}


export const register = async (req: Request, res: Response) => {

    try {
        const {username, email, password} = req.body

        if (!validateEmail(email)) {
            res.status(400).json({ error: 'Email not valid.'})
            return
        }
        const hashedPassword = await hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            admin: false,
            verified: false 
        });
        if (!user) {
            res.status(400).json({ error: 'User credentials already used.'})
            return
        }
        req.session.user = user;
        res.status(201).json({ message: 'User Registered.'});
        
    }catch (error) {
        res.status(400).json({ error: 'Request Not valid.'})
        return
    }
};

export const login = async (req: Request, res: Response) => {

    try {

        const {email,password} = req.body

        if (!validateEmail(email)) {
            res.status(400).json({ error: 'Email not valid.'})
            return
        }

        const user = await User.findOne({ where: { email } })

        if (!user || !(await compare(password, user.password))) {

            res.status(400).json({ error: 'Email or password credentials wrong.'})
            return
        }
        req.session.user = user;
        res.status(200).json({ message: 'User logged in.'});

    } catch (error) {

        res.status(400).json({ error: 'Request Not valid.'})
        return
    }

}

export const logout = async (req: Request, res: Response) => {

    res.status(200).json({ message: 'User logged out!' });
    req.session.user = undefined

}

function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}