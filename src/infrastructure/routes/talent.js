import { Router } from 'express';
const talent_Routes = Router();
import { Tcontroller } from '../../providers/controller.js';




talent_Routes.post("/signup/", (req, res) => Tcontroller.verifyEmail(req, res));
talent_Routes.get("/client/verify/:token", (req, res) => Tcontroller.verifyEmailToken(req, res));

export default talent_Routes;
