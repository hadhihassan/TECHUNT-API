import { Router } from 'express';
const client_Routes = Router();
import {
    Ccontroller,
    proposalControllers,
    Tcontroller,
    contractController,
    planControllers,
    jobPostControllers,
    reviewController
} from '../../providers/controller.js';
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
    .get("/fetch-Connected-talents/", checkToken, (req, res) => proposalControllers.fetchAllConnectedTalents(req, res))

    .get("/get-all-talent/", checkToken, (req, res) => Tcontroller.getAllTalents(req, res))
    .post("/contract/send-contract/", checkToken, (req, res) => contractController.saveNewContract(req, res))
    .get("/fetch-all-active-contract/", checkToken, (req, res) => contractController.fetchAllActiveContracts(req, res))
    .patch("/contract/milestone/send-approval/", checkToken, (req, res) => contractController.sendMilestoneApproval(req, res))
    .get("/contract/get-submitted-work/:id/", checkToken, (req, res) => contractController.getWork(req, res))
    .post("/send-money-talent/", checkToken, (req, res) => contractController.makePaymentToTalent(req, res))
    .post("/wallet/add-amount/", checkToken, (req, res) => contractController.updateTalentWalletAmount(req, res))
    .post("/contract/update-status/", checkToken, (req, res) => contractController.updateStatus(req, res))
    .get("/contract/get-completed-contracts/", checkToken, (req, res) => contractController.getCompletedContract(req, res))
    .get("/contract/get-cancelled-contract/", checkToken, (req, res) => contractController.getCancelledContract(req, res))

    .get("/get-transaction-history/", checkToken, (req, res) => Ccontroller.getTransactionHistory(req, res))

    .get("/plan/getAll/", checkToken, (req, res) => planControllers.getPlanForUsers(req, res))
    .post("/plan/purchase-plan/", checkToken, (req, res) => planControllers.purchasePlan(req, res))
    .post("/plan/plan/purchase-payment/", checkToken, (req, res) => planControllers.makePaymentForSubscrition(req, res))

    .post("/send-Invitation/", checkToken, (req, res) => Ccontroller.senInvitation(req, res))
    .get("/get-wallet-amount/", checkToken, (req, res) => Ccontroller.getWalletAmount(req, res))
    .get("/contract/get-contract/:id/", checkToken, (req, res) => contractController.getContract(req, res))
    // Reviews
    .post("/review/add-review/", checkToken, (req, res) => reviewController.saveNewReview(req, res))
    .get("/review/get-review/:id", checkToken, (req, res) => reviewController.getReviews(req, res))
    .patch("/contrat/update-reason-status/", checkToken, (req, res) => contractController.updateReasonUpdate(req, res))
    .patch("/contrat/milestone/update//", checkToken, (req, res) => contractController.updateMilestone(req, res))


export default client_Routes;
