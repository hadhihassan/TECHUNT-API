import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { TalentRepository } from '../../repository/talentDatabase.js';
import { ClientRepository } from '../../repository/clientDatabase.js';
import { STATUS_CODES } from '../../../constants/httpStatusCode.js';
const talentRepository = new TalentRepository();
const clientRepository = new ClientRepository();

const { JWT_SECRET_KEY } = process.env;

export const checkChatToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }
        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        let clientData
        
        if(decodedToken.role === "TALENT"){
            clientData = await talentRepository.findById(objectId);
        }else{
            clientData = await clientRepository.findById(objectId);
        }
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
        req.role = decodedToken.role;
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};

