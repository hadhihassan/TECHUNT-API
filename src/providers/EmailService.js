import nodemailer from 'nodemailer';
import Token from '../entites/models/token.js';
import crypto from 'crypto';
export class Mailer {
    async sendMaill(email) {
        const token = await new Token({
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/client/verify/${token.token}`;
        return this.sendEmailTransporter(email, "Verify Email", url)
    }
    async sendEmailTransporter(email, subject, html) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.HOST,
                service: process.env.SERVICE,
                port: Number(process.env.EMAIL_PORT),
                secure: Boolean(true),
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })
            await transporter.sendMail({
                from: process.env.USER,
                to: email,
                subject,
                html,
            })
            return { status: true, message: "Email sended successfully" }
        } catch (error) {
            console.log(error.message);
            return { status: false, message: "error" }
        }
    }
}