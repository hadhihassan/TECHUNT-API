import mongoose from "mongoose";
import { ChatUseCase } from "../../useCases/chat.UseCase.js";

export class ChatController {
    constructor() {
        this.chatUseCase = new ChatUseCase()
    }

    async sendMessage(req, res) {
        const { message } = req.body
        const { id } = req.params;
        const receiverId = new mongoose.Types.ObjectId(id)
        const senderId = new mongoose.Types.ObjectId(req.clientId);
        const result = await this.chatUseCase.createNewMessage(senderId, receiverId, message)
        return res.status(result.status).json(result)
    }
    async getMessage(req, res) {
        try {   
            const { id } = req.params;
            const userToChatId = new mongoose.Types.ObjectId(id);
            const senderId = new mongoose.Types.ObjectId(req.clientId);
            const result = await this.chatUseCase.getUserConversation(senderId, userToChatId)
            return res.status(result.status).json(result)
        } catch (error) {
            console.log(error.message)
        }
    }
    async getMessagedUser(req, res) {
        const currentUser = req.clientId
        console.log(req.role)
        const data = await this.chatUseCase.gteAll(currentUser, req.role)
        return res.status(200).json(data)
    }
    async createConversation(req, res) {
        const { id: receiverId } = req.body
        const senderId = req.clientId;
        console.log(senderId, receiverId)
        const result = await this.chatUseCase.createNewConversation(senderId, receiverId)
        return res.status(200).json(result)
    }
}