import jwt from 'jsonwebtoken'
import { JWT_TOKEN_EXP } from '../constants/constant.js'
export class JwtToken {
    async generateJwtToken(id) {
        try {
            const KEY = process.env.JWT_SECRET_KEY
            const payload = {
                id: id,
                exp: Math.floor(Date.now() / 1000) + JWT_TOKEN_EXP,
                iat: Math.floor(Date.now() / 1000)
            }
            return jwt.sign(payload, KEY)
        } catch (error) {
            console.log(error)
        }
    }
}