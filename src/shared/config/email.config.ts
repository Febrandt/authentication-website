import { createTransport } from "nodemailer";

export const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dustin58@ethereal.email',
        pass: 'jKkFT6seh1EXZxvxCt'
    }
});