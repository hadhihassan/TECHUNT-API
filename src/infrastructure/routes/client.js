import { Router } from 'express';
const client_Routes = Router();
import { Ccontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/ClientAuth.js';
import { upload } from '../config/multer.js';


client_Routes.post("/signup/", (req, res) => Ccontroller.verifyEmail(req, res));
client_Routes.get("/client/verify/:token", checkToken, (req, res) => Ccontroller.verifyEmailToken(req, res));
client_Routes.post("/add-contact/", checkToken, (req, res) => Ccontroller.addConatcDetails(req, res));
client_Routes.post("/upload-profile-pic/",checkToken, upload.single("image"), (req, res) => Ccontroller.uploadProfileImg(req, res));
client_Routes.post("/login/",checkToken, (req, res) => Ccontroller.Clientlogin(req, res));

export default client_Routes;
