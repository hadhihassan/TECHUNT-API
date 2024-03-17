import Client from "../../entites/models/Client.schema.js";
import Conversation from "../../entites/models/subSchema/conversation.js";
import Message from "../../entites/models/subSchema/message.js";
import Talent from "../../entites/models/talen.model.js";
import { io } from '../../providers/socket.js'
import { ClientRepository } from "./client.database.js";
import { TalentRepository } from "./talent.Database.js";



export class ChatRepository {

    async createMessage(senderId, receiverId, message) {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }
        let receiver
        receiver = await Talent.findById(receiverId)
        if (!receiver) {
            const isRecevier = await Client.findById(receiverId)
            if (isRecevier) {
                receiver = isRecevier
            }
        }
        await Promise.all([conversation.save(), newMessage.save()])
        if (receiver.online) {
            console.log(receiver?.online," this is the status")
            const id = await Message.updateMany({ senderId: senderId, receiverId: receiverId }, { $set: { read: true } })
            console.log(id)
        }
        io.emit("newMessage", newMessage);

        return true
    }

    async getUserConversation(senderId, userToChatId) {
        const conversation = await Conversation.findOne({
            participants: { $in: [senderId, userToChatId] }
        }).populate({
            path: 'messages',
            model: 'Message',
            select: '-password'
        }).exec();
        await Message.updateMany({ senderId: userToChatId, receiverId: senderId }, { $set: { read: true } })
        return conversation.messages
    }

    async findMessagedUsers(currentUserId, role) {
        if (role === "TALENT") {
            return await Conversation.find({
                participants: { $in: currentUserId }
            }).populate({
                path: 'participants',
                model: 'Client',
                match: { _id: { $ne: currentUserId } },
                select: '-password'
            }).exec();
        } else {
            return await Conversation.find({
                participants: { $in: currentUserId }
            }).populate({
                path: 'participants',
                model: 'Talent',
                match: { _id: { $ne: currentUserId } },
                select: '-password'
            }).exec();
        }
    }
    async createNewConversation(senderId, receiverId) {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
            await Promise.all([conversation.save()])
        }
        return true
    }

} 
