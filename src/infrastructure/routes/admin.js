import { Router } from 'express';
import { Acontroller, checkJobExisiting, jobCateControllers } from '../../providers/controller.js';
import { upload } from '../config/multer.js';

const admin_Router = Router();

admin_Router.post("/admin-login/", (req, res) => Acontroller.verifyLogin(req, res))
    .get("/get-all-users/", (req, res) => Acontroller.getAllUsers(req, res))
    .post("/block-user/", (req, res) => Acontroller.blockUser(req, res))

admin_Router.post("/add-new-job-category/", upload.single("image"), (req, res) => jobCateControllers.addNewJobCategory(req, res))
    .get("/get-all-job-category/", (req, res) => jobCateControllers.getJobCategory(req, res))
    .patch("/change-job-category-status/", (req, res) => jobCateControllers.changeState(req, res))
    .post("/edit-job-category-status/",  (req, res) => jobCateControllers.editJobCategory(req, res))

export default admin_Router;
