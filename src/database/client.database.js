const Client = require("../models/Client.model");
const Token = require("../models/token")

const findByEmail = async (email) => {
    const user = await Client.findOne({ email });
    console.log("database is herer", user);
    if (user) {
        return { isExist: true, data: user }
    }
    return { isExist: false }
}
const findByToken = async (token) => {
    const findToken = await Token.findOne({ token });
    console.log("database token is herer", token);
    if (findToken) {
        return { isExist: true, data: findToken }
    }
    return { isExist: false , data: findToken}
}
module.exports = {
    findByEmail, findByToken
}
