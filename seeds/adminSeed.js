import 'dotenv/config';
import mongoose from "mongoose"
import dbConnect from '../src/infrastructure/config/db.js'
import { AdminRepository } from '../src/infrastructure/repository/adminDatabase.js';
import { encrypt } from '../src/providers/controller.js'

const seedAdmin = async () => {
    try {
        await dbConnect();
        
        const adminRepository = new AdminRepository()
        const existingAdmin = await adminRepository.findByUserName(process.env.ADMIN_USER_NAME);

        if (!existingAdmin.status) {
            const username = process.env.ADMIN_USER_NAME;
            const password = process.env.ADMIN_PASSWORD;
            if (!username || !password) {
                return;
            }
            const hashedPassword = await encrypt.encryptPassword(password);
            await adminRepository.createNewAdmin(username, hashedPassword);
        }
    } catch (error) {
        console.log("Error seeding admin:", error)
    } finally {
        await mongoose.connection.close();
    }
};

seedAdmin();