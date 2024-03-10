import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { TalentRepository } from '../Repository/talent.Database.js';
import mongoose from 'mongoose';
import { getAllRoles } from '../../constants/role.js';

const talentRepository = new TalentRepository()

export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }
        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        const clientData = await talentRepository.findById(objectId);
        if (!clientData) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
        }
        if (clientData.isBlock) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                status: STATUS_CODES.UNAUTHORIZED,
                message: "Sorry your blocked",
                isBlocked: true
            });
        }
        req.clientId = clientData._id;
        req.role =  getAllRoles()[0];
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

