// controllers
import { TalentController } from "../adapters/controllers/talentControllers.js";
import { ClientController } from "../adapters/controllers/clientcontrollers.js";
import { AdminContollers } from "../adapters/controllers/adminControllers.js";
import { VerificationController } from "../adapters/controllers/verificationContoller.js"
import { JobCategoryControllers } from "../adapters/controllers/jobCategoryControllers.js";
//UseCases
import { TalentUseCase } from "../useCases/talent.intractor.js";
import { AdminUseCase } from "../useCases/admin.intaractor.js";
import { VerificationUseCase } from "../useCases/verification.intaractor.js";
import { JobCategoryUseCase } from "../useCases/jobCategory.intaractor.js";
import { ClientUseCase } from "../useCases/client.intaractor.js";
//Repository database
import { TalentRepository } from "../infrastructure/database/talent.Database.js";
import { AdminRepository } from "../infrastructure/database/admin.Database.js";
import { JobCategoryRepository } from "../infrastructure/database/jobCategory.Database.js";
import { ClientRepository } from "../infrastructure/database/client.Database.js";
//helperes 
import { Encrypth } from "./bcryptPassword.js";
import { Mailer } from "./EmailService.js";







const mailSend = new Mailer();
const encrypt = new Encrypth()

const clientRepository = new ClientRepository();
const cuseCase = new ClientUseCase(clientRepository, mailSend, encrypt);
export const Ccontroller = new ClientController(cuseCase, encrypt);

const talentRepositary = new TalentRepository()
const tUseCase = new TalentUseCase(talentRepositary, mailSend, encrypt)
export const Tcontroller = new TalentController(tUseCase, encrypt)

const verifyUseCase = new VerificationUseCase(clientRepository, talentRepositary, mailSend, encrypt)
export const Vcontoller = new VerificationController(verifyUseCase)

const adminRepository = new AdminRepository
const adminUseCase = new AdminUseCase(adminRepository, encrypt)
export const Acontroller = new AdminContollers(adminUseCase, cuseCase, tUseCase)

const jobCategoryRepository = new JobCategoryRepository()
const jobCategoryUseCase = new JobCategoryUseCase(jobCategoryRepository)
export const jobCateControllers = new JobCategoryControllers(jobCategoryUseCase)







// middlewares
import { CheckJobExisiting } from "../infrastructure/middlewares/Admin.Route.validation/jobCategory.middleware.js";
export const checkJobExisiting = new CheckJobExisiting(jobCategoryRepository)


