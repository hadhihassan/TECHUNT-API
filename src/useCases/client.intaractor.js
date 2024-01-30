

const sendEmailVerificationIntractor = async (database, email) => {
    const isExist = await database.findByEmail(email)
    if (isExist.isExist) {
        return {status : false, message: "Email already existing " }
    }
    return {status : true, message: "Email note exisiting " }

}
const checkToken = async (database, token) => {
    const result = await database.findByToken(token)
    console.log(result)
    if (result.isExist) {
        return {status : true, message: "Token note exis.. " }
    }
    return {status : false, message: "Token already exis.. " }

}
module.exports = {
    sendEmailVerificationIntractor,checkToken
}