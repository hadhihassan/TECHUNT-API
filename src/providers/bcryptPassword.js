import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../constants/constant.js'

export class Encrypt {
    //Hashing the password for the secure.
    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        return await bcrypt.hash(password, salt)
    }
    //To compare two password .
    async comparePasswords(password, hashedPassword) {
        try {
            const result = await bcrypt.compare(password, hashedPassword);
            return result;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
    
}