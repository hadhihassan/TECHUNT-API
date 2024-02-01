import { ClientController } from "../controllers/clientcontrollers.js";
import { UserRepository } from "../infrastructure/database/client.database.js";
import { ClientUseCase } from "../useCases/client.intaractor.js";
import { Mailer } from "./EmailService.js";


const mailSend = new Mailer();
const ClientRepositery = new UserRepository();
const CCuseCase = new ClientUseCase(ClientRepositery, mailSend);
export const Ccontroller = new ClientController(CCuseCase);

