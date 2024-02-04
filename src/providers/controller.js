//Client / project hire
import { ClientController } from "../adapters/controllers/clientcontrollers.js";
import { ClientRepository } from "../infrastructure/database/client.Database.js";
import { ClientUseCase } from "../useCases/client.intaractor.js";
import { Mailer } from "./EmailService.js";
//Talent / Freelancer
import { TalentRepository } from "../infrastructure/database/talent.Database.js";
import { TalentUseCase } from "../useCases/talent.intractor.js";
import { TalentController } from "../adapters/controllers/talentControllers.js"; 
import { Encrypth } from "./bcryptPassword.js";





const mailSend = new Mailer();
const encrypt = new Encrypth()
const clientRepository = new ClientRepository();
const cuseCase = new ClientUseCase(clientRepository, mailSend, encrypt);
export const Ccontroller = new ClientController(cuseCase, encrypt);

const talentRepositary = new TalentRepository()
const tUseCase = new TalentUseCase(talentRepositary, mailSend, encrypt)
export const Tcontroller = new TalentController(tUseCase, encrypt)



