import Conversation from "../../entites/models/subSchema/conversation.js";
import Message from "../../entites/models/subSchema/message.js";
import { getReceiverSocketId, io } from "../../../server.js";

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
        await Promise.all([conversation.save(), newMessage.save()])
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // log
        // if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.emit("newMessage", newMessage);
        // }
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
        console.log(conversation, " this ite xxxxxxxxxxxxxxxxxxxxxxx \n");
        return conversation.messages
    }

    async findMessagedUsers(currentUserId, role) {
        console.log(currentUserId, role)
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
