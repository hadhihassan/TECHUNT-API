import jwt from 'jsonwebtoken'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../../constants/httpStatusCode.js'
import { ClientRepository } from '../repository/clientDatabase.js';
const clientRepository = new ClientRepository()
import { getAllRoles } from '../../constants/role.js';

import mongoose from 'mongoose'

export const checkToken = async (req, res, next) => {
    try {
        const role = getAllRoles()
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }
        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        const clientData = await clientRepository.findById(objectId);
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
        req.role = role[1];
        next();
    } catch (error) {
        console.error('Error in token verification:', error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};
