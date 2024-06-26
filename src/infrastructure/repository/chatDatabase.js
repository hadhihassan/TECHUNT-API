import Client from "../../entites/models/Client.schema.js";
import Conversation from "../../entites/models/subSchema/conversation.js";
import Message from "../../entites/models/subSchema/message.js";
import Talent from "../../entites/models/talen.model.js";
import { io } from '../Socket/socket.js'




export class ChatRepository {

    async createMessage(senderId, receiverId, message) {
        try {
            await Message.updateMany({ senderId: receiverId, receiverId: senderId, read: false }, { $set: { read: true } })
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
            if (conversation.isInConversation.includes(receiverId)) {
                const a = await Message.updateMany({ senderId: senderId, receiverId: receiverId, read: false }, { $set: { read: true } })
            }
            io.emit("newMessage", newMessage);
            return true
        } catch (err) {
            console.log(err)
        }
    }

    async getUserConversation(senderId, userToChatId) {
        try {
            await Message.updateMany(
                { senderId: userToChatId, receiverId: senderId, read: false },
                { $set: { read: true } }
            );
            const conversation = await Conversation.findOne({
                participants: { $in: [senderId, userToChatId] }
            }).populate({
                path: 'messages',
                model: 'Message',
                select: '-password'
            }).exec();
            if (!conversation.isInConversation.includes(senderId)) {
                await Conversation.updateMany({ isInConversation: senderId }, { $pull: { isInConversation: senderId } })
                const updatedConversation = await Conversation.findOneAndUpdate(
                    { participants: { $all: [senderId, userToChatId] } }, 
                    { $addToSet: { isInConversation: senderId } }, 
                    { new: true } 
                );
                await conversation.save()
            }
            return conversation.messages
        } catch (error) {
            console.log(error)
        }
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
    async removeUserFormConversation(userId) {
        const result = await Conversation.updateMany(
            { participants: { $in: [userId] } },
            { $pull: { isInConversation: userId } }
        );
        return result
    }
} 