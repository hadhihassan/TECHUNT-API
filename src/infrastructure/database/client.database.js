import client from "../../entites/models/Client.model.js";
import Token from "../../entites/models/token.js";


export class ClientRepository {
    async findByEmail(email) {
        console.log("*****this is Clint ******")
        const user = await client.findOne({ Email: email });
        console.log("email ===>", user)
        if (user === null) {
            console.log("note existing ");
            return false
        }
        return true
    }

    async findById(id){
        return await client.findById(id)
    }
    async findByToken(token) {
        const findToken = await Token.findOne({ token });
        if (findToken) {
            return { isExist: true, data: findToken }
        }
        return { isExist: false, data: findToken }
    }

    async addEmail(email) {
        try {
            const emailClient = new client({
                Email: email
            });
            await emailClient.save();
            console.log(emailClient, "save email fun");
            return emailClient;
        } catch (error) {
            throw new Error("Saving email got an error");  // Corrected error handling
            console.log(error);
        }
    }

}

