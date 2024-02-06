import { Router } from 'express';
const talent_Routes = Router();
import { Tcontroller } from '../../providers/controller.js';
import { checkToken } from '../middlewares/talentAuth.js';
import { upload } from '../config/multer.js';




talent_Routes.post("/signup/", (req, res) => Tcontroller.verifyEmail(req, res));

talent_Routes.get("/verify/:token", checkToken, (req, res) => Tcontroller.verifyEmailToken(req, res));
talent_Routes.post("/add-contact/", checkToken, (req, res) => Tcontroller.addConatcDetails(req, res));
talent_Routes.post("/upload-profile-pic/", checkToken, upload.single("image"), (req, res) => Tcontroller.uploadProfileImg(req, res));
talent_Routes.post("/login/", (req, res) => Tcontroller.TalentLogin(req, res));
talent_Routes.post("/save-bio-data/", checkToken, (req, res) => Tcontroller.saveJobBasedData(req, res));
talent_Routes.get("/get-profile-Data/", checkToken, (req, res) => Tcontroller.getTalentProfile(req, res));


export default talent_Routes;
