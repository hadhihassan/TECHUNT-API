import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { AdminRepository } from '../Repository/admin.Database.js';
const adminRepository = new AdminRepository()


export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }
        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        const clientData = await adminRepository.findById(decodedToken.id);
        if (!clientData) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
        }
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
