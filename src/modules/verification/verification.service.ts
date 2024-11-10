import { transporter } from "../../shared/config/email.config"
import {createReadStream} from 'fs';

let pinMap: Map<string,number> = new Map<string,number>();


function generatePinForEmail(email: string) {

    function randomIntFromInterval(min: number, max: number) { 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const randomPin: number = randomIntFromInterval(1000,9999)

    pinMap.set(email,randomPin)

}


export const sendVerificationEmail = async (email: string): Promise<void> => {

    pinMap.delete(email);

    generatePinForEmail(email)

    const pin = pinMap.get(email);

    await transporter.sendMail({
        from: '<dasia.hermann8@ethereal.email>',
        to: `<${email}>`,
        subject: `Your PIN CODE is ${pin}!`,
        text: 'Or click the link bellow to verify account!',
        html: `
        <!DOCTYPE html>
        <html lang="en">

        <body>

          <div style="width: 50%; max-width: 1140px; margin: 0 auto; padding: 20px; border: 1px solid #d3d3d3; border-radius: 8px; text-align: center;">
            <h2 style="font-size: 2rem; font-weight: 500;">Your Pin Code is</h2>
            <h2 style="color: #3bc64b;font-size: 2rem; font-weight: 700;">${pin}</h2>
            <p style="color: #3bc64b; font-size: 1rem;">Thank you for signing up! Please verify your email address to complete the registration.</p>
            <p style="color: #3bc64b; font-size: 1rem; font-weight: 500">Enter the Pin in the Verification Page or Click The Button Bellow To Verify.</p>
            <a href="http://localhost:3000/verification/directlink/${pin}" style="display: inline-block; padding: 0.5rem 1rem; font-size: 1rem; font-weight: 400; color: #fff; text-align: center; text-decoration: none; background-color: #3bc64b; border-radius: 0.25rem;" target="_blank">Verify Email</a>
            <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
          </div>

        </body>
        </html>
        `
    })
}



export const deletePinMapRegister = (pin: number, email: string): boolean => {

    if (!pinMap.has(email)){
        return false
    }
    if (pinMap.get(email) != pin){
        return false
    }

    pinMap.delete(email);
    return true;
}