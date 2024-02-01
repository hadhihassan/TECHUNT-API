import { Router } from 'express';
const client_Routes = Router();
import { Ccontroller } from '../../providers/controller.js';




client_Routes.post("/signup/", (req, res) => Ccontroller.verifyEmail(req, res));
client_Routes.get("/client/verify/:token", (req, res) => Ccontroller.verifyEmailToken(req, res));

export default client_Routes;
