import jwt from 'jsonwebtoken'
import { JWT_TOKEN_EXP } from '../constants/constant.js'
export class JwtToken {
    async generateJwtToken(id, role) {
        try {
            const KEY = process.env.JWT_SECRET_KEY
            const payload = {
                id: id,
                exp: Math.floor(Date.now() / 1000) + JWT_TOKEN_EXP,
                iat: Math.floor(Date.now() / 1000),
                role: role
            }
            return jwt.sign(payload, KEY)
        } catch (error) {
            console.log(error)
        }
    }
    async verifyJwt(token){
        return jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
    }
}