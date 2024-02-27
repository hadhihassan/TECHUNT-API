import { Router } from 'express';
const client_Routes = Router();
import { Ccontroller, proposalControllers } from '../../providers/controller.js';
import { jobPostControllers } from '../../providers/controller.js';
import { checkToken } from '../middlewares/clientAuth.js';
import { upload } from '../config/multer.js';


client_Routes.post("/signup/", (req, res) => Ccontroller.verifyEmail(req, res))
            .get("/verify/:token", checkToken, (req, res) => Ccontroller.verifyEmailToken(req, res))

            .post("/add-contact/", checkToken, (req, res) => Ccontroller.addConatcDetails(req, res))
            .post("/upload-profile-pic/", checkToken, upload.single("image"), (req, res) => Ccontroller.uploadProfileImg(req, res))
            .get("/get-profile-Data/", checkToken, (req, res) => Ccontroller.getClientProfile(req, res))
            .post("/edit-profile-section-1/", checkToken, (req, res) => Ccontroller.editProfile(req, res))
            .post("/edit-profile-contact/", checkToken, (req, res) => Ccontroller.updateConatctDeatils(req, res))

            .post("/post-job/", checkToken, (req, res) => jobPostControllers.createNewJobPost(req, res))
            .get("/get-all-jobpost/", checkToken, (req, res) => jobPostControllers.diplsyaAllJoboPost(req, res))
            .patch("/edit-jobpost/", checkToken, (req, res) => jobPostControllers.editJoboPost(req, res))
            
            .post("/get-all-proposals/", checkToken, (req, res) => proposalControllers.getAllproposal(req, res))
            .patch("/update-proposal-accept/", checkToken, (req, res) => proposalControllers.updateAcceptence(req, res))
            .patch("/update-proposal-decline/", checkToken, (req, res) => proposalControllers.updateDecline(req, res))
export default client_Routes;
