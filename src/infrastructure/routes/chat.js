import { Router } from 'express';
import { chatController } from '../../providers/controller.js';
import { checkChatToken } from '../../infrastructure/middlewares/Admin.Route.validation/chatAuth.js'
const chatRouter = Router();

chatRouter.post("/send/:id/", checkChatToken, (req, res) => chatController.sendMessage(req, res))
chatRouter.get("/get-messages/:id/", checkChatToken, (req, res) => chatController.getMessage(req, res))
chatRouter.get("/get-Conversations/", checkChatToken, (req, res) => chatController.getMessagedUser(req, res))
chatRouter.post("/create-conversation/", checkChatToken, (req, res) => chatController.createConversation(req, res))

export default chatRouter;
