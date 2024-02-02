import { Router } from 'express';
const verification = Router();
import { Ccontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/ClientAuth.js';



verification.get("/client/verify/:token", checkToken, (req, res) => Ccontroller.verifyEmailToken(req, res));

export default verification;
