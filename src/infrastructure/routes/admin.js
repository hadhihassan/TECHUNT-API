import { Router } from 'express';
import { Acontroller, jobCateControllers, jobPostControllers, planControllers } from '../../providers/controller.js';
import { upload } from '../config/multer.js';
import { checkToken } from '../middlewares/adminAuth.js'
const admin_Router = Router();

//Admin user routes
admin_Router.post("/admin-login/", (req, res) => Acontroller.verifyLogin(req, res))
    .get("/get-all-users/",  (req, res) => Acontroller.getAllUsers(req, res))
    .post("/block-user/", checkToken, (req, res) => Acontroller.blockUser(req, res))

//Job Category routes
    .post("/add-new-job-category/", checkToken, upload.single("image"), (req, res) => jobCateControllers.addNewJobCategory(req, res))
    .get("/get-all-job-category/",checkToken,  (req, res) => jobCateControllers.getJobCategory(req, res))
    .patch("/change-job-category-status/", checkToken, (req, res) => jobCateControllers.changeState(req, res))
    .post("/edit-job-category-status/", checkToken, upload.single("image"), (req, res) => jobCateControllers.editJobCategory(req, res))

//Job post routes
    .patch("/get-job-post/", checkToken, (req, res) => jobPostControllers.getJobPost(req, res))

//Dashboard routes
    .get("/get-dashBoardData/", checkToken, (req, res) => Acontroller.getDashboard(req, res))

//Plan routes
    .post("/plan/create-new/", checkToken, (req, res) => planControllers.createNewPlan(req, res))
    .get("/plan/get-all/", checkToken, (req, res) => planControllers.getAllPlans(req, res))
    .get("/plan/get-plan/:id/", checkToken, (req, res) => planControllers.getPlan(req, res))
    .get("/plan/edit-plan/:id/", checkToken, (req, res) => planControllers.getPlan(req, res))
    .put("/plan/update/", checkToken, (req, res) => planControllers.updatePlan(req, res))

export default admin_Router;
