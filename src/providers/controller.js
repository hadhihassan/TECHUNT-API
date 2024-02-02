//Client / project hire
import { ClientController } from "../adapters/controllers/clientcontrollers.js";
import { ClientRepository } from "../infrastructure/database/client.Database.js";
import { ClientUseCase } from "../useCases/client.intaractor.js";
import { Mailer } from "./EmailService.js";
//Talent / Freelancer
import { TalentRepository } from "../infrastructure/database/talent.Database.js";
import { TalentUseCase } from "../useCases/talent.intractor.js";
import { TalentController } from "../adapters/controllers/talentControllers.js"; 





const mailSend = new Mailer();

const clientRepository = new ClientRepository();
const cuseCase = new ClientUseCase(clientRepository, mailSend);
export const Ccontroller = new ClientController(cuseCase);

const talentRepositary = new TalentRepository()
const tUseCase = new TalentUseCase(talentRepositary, mailSend)
export const Tcontroller = new TalentController(tUseCase)



