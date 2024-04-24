import { Router } from 'express';
const talent_Routes = Router();
import {
    Tcontroller,
    jobCateControllers,
    jobPostControllers,
    proposalControllers,
    contractController,
    planControllers,
    reviewController
} from '../../providers/controller.js';
import { checkToken } from '../middlewares/talentAuth.js';
import { upload } from '../config/multer.js';


talent_Routes.post("/signup/", (req, res) => Tcontroller.verifyEmail(req, res))
    .get("/verify/:token", checkToken, (req, res) => Tcontroller.verifyEmailToken(req, res))
    .post("/add-contact/", checkToken, (req, res) => Tcontroller.addConatcDetails(req, res))
    .post("/upload-profile-pic/", checkToken, upload.single("image"), (req, res) => Tcontroller.uploadProfileImg(req, res))
    .post("/save-bio-data/", checkToken, (req, res) => Tcontroller.saveJobBasedData(req, res))
    .patch("/profile/resume-save/", checkToken, (req, res) => Tcontroller.saveTalentResume(req, res))

    .get("/get-profile-Data/", checkToken, (req, res) => Tcontroller.getTalentProfile(req, res))
    .post("/edit-profile-section-1/", checkToken, (req, res) => Tcontroller.editProfileFirstSection(req, res))
    .post("/update-skills/", checkToken, (req, res) => Tcontroller.updateSkills(req, res))
    .post("/update-experiance/", checkToken, (req, res) => Tcontroller.updateExperiance(req, res))
    .post("/edit-profile-contact/", checkToken, (req, res) => Tcontroller.updateConatctDeatils(req, res))
    .get("/fetch-job-cate/", (req, res) => jobCateControllers.getJobCategory(req, res))
    .get("/fetch-all-job-post/", checkToken, (req, res) => jobPostControllers.getAllJobPostForTalent(req, res))
    .post("/upload-attachment/", checkToken, (req, res) => proposalControllers.getSignedUrlForS3Store(req, res))
    .post("/submit-proposal/", checkToken, (req, res) => proposalControllers.saveProposal(req, res))
    .post("/make-payment-proposal/", checkToken, (req, res) => proposalControllers.makeProposalPayment(req, res))
    .patch("/update-payment-status/", checkToken,(req, res) => proposalControllers.updatePaymentStatus(req, res))
    .get("/fetch-all-clients/", checkToken, (req, res) => Tcontroller.getAllClientsForTalent(req, res))
    .get("/fetch-all-clients-proposal/:id/", checkToken, (req, res) => Tcontroller.getClientProposals(req, res))
    .get("/fetch-all-new-contract/", checkToken, (req, res) => contractController.fetchAllNewContracts(req, res))
    .patch("/update-contract-status/", checkToken, (req, res) => contractController.updateContractStatus(req, res))
    .get("/fetch-all-active-contract/", checkToken, (req, res) => contractController.fetchAllActiveContracts(req, res))
    .patch("/update-milestone-status/", checkToken, (req, res) => contractController.updateMilestoneStatus(req, res))
    .post("/contract/milestone/submit-work/", checkToken, (req, res) => contractController.saveWork(req, res))
    .patch("/contract/milestone/edit-work/", checkToken, (req, res) => contractController.saveEditWork(req, res))
    .get("/contract/get-submitted-work/:id/", checkToken, (req, res) => contractController.getWork(req, res))
    .post("/contract/update-status/", checkToken, (req, res) => contractController.updateStatus(req, res))
    .get("/contract/get-completed-contracts/", checkToken, (req, res) => contractController.getCompletedContract(req, res))
    .get("/contract/get-cancelled-contract/", checkToken, (req, res) => contractController.getCancelledContract(req, res))
    .patch("/contract/reShedule/", checkToken, (req, res) => contractController.reSheduleWork(req, res))


    .get("/get-transaction-history/", checkToken, (req, res) => Tcontroller.getTalentTransactionHistory(req, res))
    .get("/plan/getAll/", checkToken, (req, res) => planControllers.getPlanForUsers(req, res))
    .post("/plan/purchase-plan/", checkToken, (req, res) => planControllers.purchasePlan(req, res))
    .post("/plan/plan/purchase-payment/", checkToken, (req, res) => planControllers.makePaymentForSubscrition(req, res))
    .post("/search/find-job/", (req, res) => jobPostControllers.findJobPost(req, res))
    .get("/get-wallet-amount/", checkToken, (req, res) => Tcontroller.getWalletAmount(req, res))
    .get("/contract/get-contract/:id/", checkToken, (req, res) => contractController.getContract(req, res))
    .post("/profile/save-education/", checkToken, (req, res) => Tcontroller.saveEduction(req, res))
    .delete("/profile/delete-education/:id", checkToken, (req, res) => Tcontroller.deleteEducation(req, res))
    .patch("/profile/edit-education/", checkToken, (req, res) => Tcontroller.editEducation(req, res))
    // Reviews
    .post("/review/add-review/", checkToken, (req, res) => reviewController.saveNewReview(req, res))
    .get("/review/get-review/:id", checkToken, (req, res) => reviewController.getReviews(req, res))
    .get("/get-all-talent-data/:id", (req, res) => Tcontroller.getDataForTalent(req, res))

    .get("/educations/get-educations", (req, res) => Tcontroller.getEducations(req, res))


export default talent_Routes;
