import bodyParser from "body-parser";
import session from "express-session";
import express from 'express'
import path from "path";
import { fileURLToPath } from 'url';
import userRouter from "./modules/user/user.route";
import verificationRouter from "./modules/verification/verification.route";

import { User } from "./modules/user/user.model";
import { notFound } from "./shared/middlewares/error.handler";

declare module 'express-session' {
    interface SessionData {
      user: User;
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()


app.use(session({
    secret: 'AJObSJasLW223a2',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:1000*60*60*24*7}
}))
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'shared/views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public',express.static(__dirname + '/shared/public'))


app.use('/user',userRouter)
app.use('/verification', verificationRouter)

app.get('/', (req,res) => {res.render('index', {user: req.session.user})})
app.get('/login', (req,res) => {res.render('login', {user: req.session.user})})
app.get('/register', (req,res) => {res.render('register', {user: req.session.user})})


app.use(notFound)

app.listen(3000, () => console.log('server running on port 3000'));

