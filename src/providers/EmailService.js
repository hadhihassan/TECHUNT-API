const nodemailer = require("nodemailer")
const Token = require('../models/token')
const crypto = require('crypto')



module.exports =  sendMaill = async (email) => {
    const token = await new Token({
        token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}client/verify/${token.token}`;
    return sendEmailTransportere(email, "Verify Email", url)
}


sendEmailTransportere = async(email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
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
            text,
        })
        return {status : true, message : "Email sended successfully"}
    } catch (error) {
        console.log(error.message);
        return {status : false, message : "error"}


    }
}

