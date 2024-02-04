import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { TalentRepository } from '../database/talent.Database.js';
const talentRepository = new TalentRepository()


export const checkToken = async (req, res, next) => {
    console.log(req.headers,"hai  ");
    try {
        const token = req.headers.authorization
        if (token) {
            const decode = jwt.verify(token.slice(7), JWT_SECRET_KEY,)
            console.log("========================");
            console.log(decode)
            const clientData = await talentRepository.findById(decode.id)
            console.log("user data \n", clientData)
            req.session.clientId = clientData._id
            next()
        } else {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not detected" })
        }
    } catch (error) {
        console.log(error)
    }
}

