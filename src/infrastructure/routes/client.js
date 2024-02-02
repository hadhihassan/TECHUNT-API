import { Router } from 'express';
const client_Routes = Router();
import { Ccontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/ClientAuth.js';



client_Routes.post("/signup/", (req, res) => Ccontroller.verifyEmail(req, res));
client_Routes.get("/client/verify/:token", checkToken, (req, res) => Ccontroller.verifyEmailToken(req, res));

export default client_Routes;
