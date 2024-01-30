const clientDatabse = require('../database/client.database')
const clientIntaractor = require("../useCases/client.intaractor")
const sendEmail = require("../providers/EmailService")





const emailVerification = async (req, res) => {

    const { email } = req.body
    if (!email) {
        console.log("Email empty");
        return res.status(403).json({ message: "Email note valid enter the valid email address" })
    }
    const result = await clientIntaractor.sendEmailVerificationIntractor(clientDatabse, email)

    if (!result.status) {
        console.log(result, "data is this ");
        return res.json({ status: false, message: result.message })
    }
    const status = await sendEmail(email)
    console.log(status, "sended email");
    return status
}

const clientContollers = async (req, res) => {
    const { token } = req.params;
    console.log(token);
    let result = await clientIntaractor.checkToken(clientDatabse, token)
    if(!result.status){
        console.log(result.status,"-----status");
        return res.status(403).json({status:false })
    }
    return res.status(201).json({status:true ,message : "token is exisiting sucess..."})
}




module.exports = {
    emailVerification,
    clientContollers
}