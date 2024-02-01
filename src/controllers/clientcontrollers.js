// clientController.js
import { ClientUseCase } from '../useCases/client.intaractor.js';

export class ClientController {
    constructor(clientUseCase) {
        this.clientUseCase = new ClientUseCase();
    }


    async verifyEmail(req, res) {
        try {
            const email = Object.keys(req.body)[0]
            console.log("ClientController verifyEmail function");
            const isExist = await this.clientUseCase.isEmailExist(email);
            console.log("Email is",email)
            if (!isExist.isExist) {
                console.log(isExist.isExist,email);
                let sended = await this.clientUseCase.sendTimeoutLinkEmailVerification(email);
                res.status(201).json({data : "successfully sended"})
            }
            return res.status(403).json({message : "email Alredy exsting"})
        } catch (error) {
            console.log(error.message);
        }
    }

    async verifyEmailToken(req, res) {
        try {
            const { token } = req.params;
            const isExist = await this.clientUseCase.isTokenExist(token);

            if (!isExist.isExist) {
                return res.status(403).json({ status: false });
            }

            return res.status(201).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }
}
