import talent from "../../entites/models/talen.model.js";
import Token from "../../entites/models/token.js";


export class TalentRepository {
    async findByEmail(email) {
        console.log("*****this is Talent ******")
        const heISHere = await talent.findOne({ Email: email });
        console.log("database is herer", user);
        if (heISHere === null) {
            return false
        }
        return true
    }

    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        console.log("database token is herer", token);
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }

    async saveEmail(email) {
        try {
            const emailClient = new talent({
                Email: email
            })
            await emailClient.save()
            return emailClient
        } catch (error) {
            throw new error.message
        }
    }
}

