import Client from "../../entites/models/Client.model.js";
import Token from "../../entites/models/token.js";


export class UserRepository {
    async findByEmail (email){
        const user = await Client.findOne({ email });
        console.log("database is herer", user);
        if (user) {
            return { isExist: true, data: user }
        }
        return { isExist: false }
    }
    async findByToken (token){
        const findToken = await Token.findOne({ token });
        console.log("database token is herer", token);
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }
}

