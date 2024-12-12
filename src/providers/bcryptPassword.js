import bcrypt from 'bcryptjs'
import { SALT_ROUND } from '../constants/constant.js'

export class Encrypt {
    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        return await bcrypt.hash(password, salt)
    }
    async comparePasswords(password, hashedPassword) {
        try {
            const result = await bcrypt.compare(password, hashedPassword);
            return result;
        } catch (error) {
            throw error; 
        }
    }   
}