import mongoose from "mongoose";
import admin from "../../entites/models/admin.model.js";
import { STATUS_CODES } from "../../constants/httpStatusCode.js";

export class AdminRepository {
    async findByUserName(userName) {
        const result = await admin.findOne({ userName })
        if (result) {
            return { status: true, data: result }
        }
        return { status: false, data: result }
    }
    async findById(id) {
       return await admin.findById(id)
    }
    
}