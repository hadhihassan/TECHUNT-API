import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../constants/constant.js'


export class Encrypth {
    //Hashing the password for the secure.
    async encrypthPassword(password) {
        const salt = await bcrypt.genSalt(SALT_ROUND);
        return await bcrypt.hash(password, salt)
    }
    //To compare two password .
    async comparePasswords(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword)
    }
}