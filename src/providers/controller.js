// controllers
import { TalentController } from "../adapters/controllers/talentControllers.js";
import { ClientController } from "../adapters/controllers/clientcontrollers.js";
import { AdminContollers } from "../adapters/controllers/adminControllers.js";
import { VerificationController } from "../adapters/controllers/verificationContoller.js"
import { JobCategoryControllers } from "../adapters/controllers/jobCategoryControllers.js";
import { JobPostController } from "../adapters/controllers/jobPostControllers.js";
import { ProposalController } from "../adapters/controllers/proposalControllers.js";
import { ChatController } from "../adapters/controllers/ChatControllers.js";


//UseCases
import { TalentUseCase } from "../useCases/talent.intractor.js";
import { AdminUseCase } from "../useCases/admin.intaractor.js";
import { VerificationUseCase } from "../useCases/verification.intaractor.js";
import { JobCategoryUseCase } from "../useCases/jobCategory.intaractor.js";
import { ClientUseCase } from "../useCases/client.intaractor.js";
import { JobPostUseCase } from "../useCases/jobPost.intaractor.js"
import { ProposalUseCase } from "../useCases/proposal.intaractor.js";
import { ChatUseCase } from "../useCases/chat.Intaractor.js";


//Repository database
import { TalentRepository } from "../infrastructure/Repository/talent.Database.js";
import { AdminRepository } from "../infrastructure/Repository/admin.Database.js";
import { JobCategoryRepository } from "../infrastructure/Repository/jobCategory.Database.js";
import { ClientRepository } from "../infrastructure/Repository/client.Database.js";
import { JobPostRepository } from "../infrastructure/Repository/jobPost.Database.js";
import { ChatRepository } from "../infrastructure/repository/chat.Database.js";


//services 
import { Encrypt } from "./bcryptPassword.js";
import { Mailer } from "./EmailService.js";
import { S3Service } from "./S3.js";

const mailSend = new Mailer();
const encrypt = new Encrypt()
const s3Service = new S3Service()

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

// middlewares
import { CheckJobExisiting } from "../infrastructure/middlewares/Admin.Route.validation/jobCategory.middleware.js";
import { ProposalRepository } from "../infrastructure/Repository/proposal.Database.js";
export const checkJobExisiting = new CheckJobExisiting(jobCategoryRepository)

