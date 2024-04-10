// controllers
import { TalentController } from "../adapters/controllers/talentControllers.js";
import { ClientController } from "../adapters/controllers/clientcontrollers.js";
import { AdminContollers } from "../adapters/controllers/adminControllers.js";
import { VerificationController } from "../adapters/controllers/verificationContoller.js"
import { JobCategoryControllers } from "../adapters/controllers/jobCategoryControllers.js";
import { JobPostController } from "../adapters/controllers/jobPostControllers.js";
import { ProposalController } from "../adapters/controllers/proposalControllers.js";
import { ChatController } from "../adapters/controllers/ChatControllers.js";
import { ContractController } from '../adapters/controllers/contractControllers.js'
import { PlanController } from '../adapters/controllers/planControllers.js'
import { ReviewController } from "../adapters/controllers/reviewControllers.js";

//UseCases
import { TalentUseCase } from "../useCases/talent.UseCase.js";
import { AdminUseCase } from "../useCases/admin.UseCase.js";
import { VerificationUseCase } from "../useCases/verification.UseCase.js";
import { JobCategoryUseCase } from "../useCases/jobCategory.USeCase.js";
import { ClientUseCase } from "../useCases/client.UseCase.js";
import { JobPostUseCase } from "../useCases/jobPost.UseCase.js"
import { ProposalUseCase } from "../useCases/proposal.UseCase.js";
import { ChatUseCase } from "../useCases/chat.UseCase.js";
import { ContractUseCase } from "../useCases/contract.UseCase.js";
import { MilestoneUseCase } from "../useCases/milestone.UseCase.js";
import { PlanUesCase } from "../useCases/plan.UseCase.js";
import { ReviewUseCase } from "../useCases/review.UseCase.js";


//Repository database
import { TalentRepository } from "../infrastructure/Repository/talent.Database.js";
import { AdminRepository } from "../infrastructure/Repository/admin.Database.js";
import { JobCategoryRepository } from "../infrastructure/Repository/jobCategory.Database.js";
import { ClientRepository } from "../infrastructure/Repository/client.Database.js";
import { JobPostRepository } from "../infrastructure/Repository/jobPost.Database.js";
import { ChatRepository } from "../infrastructure/repository/chat.Database.js";
import { ContractRepository } from "../infrastructure/repository/contract.Database.js";
import { MilestoneRepository } from "../infrastructure/repository/milestone.Database.js";
import { PlanRepository } from "../infrastructure/repository/plan.Database.js";
import { SubscriptionRepository } from "../infrastructure/repository/subscription.js";
import { ReviewRepository } from "../infrastructure/repository/review.Database.js";






//services 
import { Encrypt } from "./bcryptPassword.js";
import { Mailer } from "./EmailService.js";
import { S3Service } from "./S3.js";

const mailSend = new Mailer();
const encrypt = new Encrypt()
const s3Service = new S3Service()

const planRepository = new PlanRepository()
const planUseCase = new PlanUesCase(planRepository, SubscriptionRepository)
export const planControllers = new PlanController(planUseCase)

const milestoneRepository = new MilestoneRepository()
const contractRepository = new ContractRepository()
const contractUseCase = new ContractUseCase(contractRepository)
const milestoneUseCase = new MilestoneUseCase(milestoneRepository)
export const contractController = new ContractController(contractUseCase, milestoneUseCase)

const proposalRepository = new ProposalRepository()
const proposalUseCase = new ProposalUseCase(s3Service, proposalRepository)
export const proposalControllers = new ProposalController(proposalUseCase)

const clientRepository = new ClientRepository();
const cuseCase = new ClientUseCase(clientRepository, mailSend, encrypt);
export const Ccontroller = new ClientController(cuseCase, encrypt);

const talentRepositary = new TalentRepository()
const tUseCase = new TalentUseCase(talentRepositary, mailSend, encrypt, cuseCase)
export const Tcontroller = new TalentController(tUseCase, encrypt)

const verifyUseCase = new VerificationUseCase(clientRepository, talentRepositary, mailSend, encrypt)
export const Vcontoller = new VerificationController(verifyUseCase)

const adminRepository = new AdminRepository
const adminUseCase = new AdminUseCase(adminRepository, encrypt)
export const Acontroller = new AdminContollers(adminUseCase, cuseCase, tUseCase)

const jobCategoryRepository = new JobCategoryRepository()
const jobCategoryUseCase = new JobCategoryUseCase(jobCategoryRepository)
export const jobCateControllers = new JobCategoryControllers(jobCategoryUseCase)

const jobPostRepository = new JobPostRepository()
const jobPostUseCase = new JobPostUseCase(jobPostRepository)
export const jobPostControllers = new JobPostController(jobPostUseCase)

const chatRepository = new ChatRepository()
const chatUseCase = new ChatUseCase(chatRepository)
export const chatController = new ChatController(chatUseCase)

const reviewRepository = new ReviewRepository()
const reviewUseCase = new ReviewUseCase(reviewRepository)
export const reviewController = new ReviewController(reviewUseCase)


// middlewares
import { CheckJobExisiting } from "../infrastructure/middlewares/Admin.Route.validation/jobCategory.middleware.js";
import { ProposalRepository } from "../infrastructure/Repository/proposal.Database.js";

export const checkJobExisiting = new CheckJobExisiting(jobCategoryRepository)

