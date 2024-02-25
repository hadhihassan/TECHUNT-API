import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { ClientRepository } from '../Repository/client.Database.js';
const clientRepository = new ClientRepository()


export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }

        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        const clientData = await clientRepository.findById(decodedToken.id);
        if (!clientData) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        if (clientData.isBlock) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Sorry youre blocked",
                isBlocked: true
            });
        }

        req.clientId = clientData._id;
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
