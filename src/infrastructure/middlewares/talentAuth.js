import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { TalentRepository } from '../database/talent.Database.js';
const talentRepository = new TalentRepository()


export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            const decode = jwt.verify(token.slice(7), JWT_SECRET_KEY,)
            const clientData = await talentRepository.findById(decode.id)
            req.clientId = clientData._id;
            next()
        } else {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not detected" })
        }
    } catch (error) {
        console.log(error)
    }
}

