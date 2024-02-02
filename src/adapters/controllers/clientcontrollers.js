import { ClientUseCase } from '../../useCases/client.intaractor.js';

export class ClientController {
    constructor(clientUseCase) {
        this.clientUseCase = new ClientUseCase();
    }


    async verifyEmail(req, res) {
        try {
            console.log(req.body)
            console.log(req.headers.authtoken,"this is headers")
            const { type } = req.body
            const { email } = req.body
            const isExist = await this.clientUseCase.isEmailExist(email);
            console.log(isExist);
            if (!isExist) {
                await this.clientUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.clientUseCase.saveEmail(email)
                console.log(saved, "THE JWT")
                return res.status(201).json(saved)
            }

            return res.status(403).json({ message: "email Alredy exsting" })
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
