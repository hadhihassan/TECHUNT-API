import { STATUS_CODES } from "../constants/httpStatusCode.js";
import { get500Response } from "../infrastructure/helperFunctions/response.js";
import { ChatRepository } from "../infrastructure/repository/chat.Database.js";

export class ChatUseCase {
    constructor() {
        this.chatRepository = new ChatRepository()
    }
    async createNewMessage(senderId, receiverId, message) {
        try {
            const newMessage = await this.chatRepository.createMessage(senderId, receiverId, message)
            if (newMessage) {
                return {
                    status: STATUS_CODES.OK,
                    message: "Message sended successful",
                    success: true
                }
            }
            return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "Message sended failed",
                success: true
            }
        } catch (error) {
            get500Response(error)
        }
    }
    async getUserConversation(senderId, userToChatId) {
        try {
            const messages = await this.chatRepository.getUserConversation(senderId, userToChatId)
            if (messages) {
                return {
                    status: STATUS_CODES.OK,
                    message: "success",
                    success: true,
                    messages: messages
                }
            } return {
                status: STATUS_CODES.BAD_REQUEST,
                message: "failed",
                success: false
            }
        } catch (error) {
            get500Response(error)
        }
    }
    async gteAll(id, role){
        return await this.chatRepository.findMessagedUsers(id, role)
    }
    async createNewConversation(senderId, receiverId){
        return await this.chatRepository.createNewConversation(senderId, receiverId)
    }

}