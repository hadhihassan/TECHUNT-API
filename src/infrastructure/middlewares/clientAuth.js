import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { ClientRepository } from '../database/client.Database.js';
const clientRepository = new ClientRepository()


export const checkToken = async (req, res, next) => {
    console.log(req.headers.authorization,"hai  ");
    try {
        const token = req.headers.authorization
        if (token) {
            const decode = jwt.verify(token.slice(7), JWT_SECRET_KEY,)
            console.log("========================");
            console.log(decode)
            const clientData = await clientRepository.findById(decode.id)
            console.log("user data \n", clientData)
            console.log("========================");
            next()
        } else {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not detected" })
        }
    } catch (error) {
        console.log(error)
    }
}

