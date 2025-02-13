import { Router } from 'express';
import { chatController } from '../../providers/controller.js';
import { checkChatToken } from '../../infrastructure/middlewares/Admin.Route.validation/chatAuth.js'
const chatRouter = Router();

//Chat routes
chatRouter.post("/send/:id/", checkChatToken, (req, res) => chatController.sendMessage(req, res))
chatRouter.get("/get-messages/:id/", checkChatToken, (req, res) => chatController.getMessage(req, res))
chatRouter.get("/get-Conversations/", checkChatToken, (req, res) => chatController.getMessagedUser(req, res))
chatRouter.post("/create-conversation/", checkChatToken, (req, res) => chatController.createConversation(req, res))
chatRouter.patch("/set-user-is-offline/", checkChatToken, (req, res) => chatController.removeFromChat(req, res))

export default chatRouter;
