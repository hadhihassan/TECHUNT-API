import { STATUS_CODES } from '../../constants/httpStatusCode.js';
import { ClientUseCase } from '../../useCases/client.intaractor.js';
import path from "path";
import fs from "fs";
import { Encrypth } from '../../providers/bcryptPassword.js';
export class ClientController {
    constructor(clientUseCase, encrypt) {
        this.clientUseCase = new ClientUseCase();
        this.encrypt = new Encrypth()
    }


    async verifyEmail(req, res) {
        try {
            const { type } = req.body
            const { email } = req.body
            const { password } = req.body
            const isExist = await this.clientUseCase.isEmailExist(email);
            if (!isExist.status) {
                const securePassword = await this.encrypt.encrypthPassword(password)
                await this.clientUseCase.sendTimeoutLinkEmailVerification(email);
                const saved = await this.clientUseCase.saveSignupData(email, securePassword)
                return res.status(STATUS_CODES.OK).json(saved)
            }else{
                return res.status(STATUS_CODES.CONFLICT).json({ message: "Email Alredy exsting" })
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    async verifyClient(req,res){
        try {
            console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }
    async verifyEmailToken(req, res) {
        try {
            const { token } = req.params;
            const isExist = await this.clientUseCase.isTokenExist(token);

            if (!isExist) {
                return res.status(STATUS_CODES.FORBIDDEN).json({ status: false });
            }

            return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Token exists successfully." });
        } catch (error) {
            console.log(error.message);
        }
    }

    async addConatcDetails(req, res) {
        try {
            const formData = req.body
            console.log(formData, req.session.id);
            const response = await this.clientUseCase.saveConatctDeatils(formData, req.session.clientId)
            if (response) {
                return res.status(STATUS_CODES.CREATED).json({ status: true, message: "Conatct deatisl saved" })
            }
        } catch (error) {
            console.log(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });

        }
    }
    async uploadProfileImg(req, res) {
        try {
            const fileName = req.file?.filename
            const id = req.session.clientId
            await this.clientUseCase.saveProfilePic(fileName, id)
            return res.status(STATUS_CODES.CREATED)
        } catch (error) {
            console.error(error);
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
    async Clientlogin(req,res){
        try {
            const { email, password } = req.body
            console.log(req.body)
            const result = await this.clientUseCase.verifyLogin(email, password)
            console.log("is logged")
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
    }


}
