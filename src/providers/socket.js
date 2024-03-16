import { Server as SocketIO } from 'socket.io';
import NotificationModel from '../entites/models/subSchema/notification.schema.js';
import { TalentRepository } from '../infrastructure/repository/talent.Database.js'
import { ClientRepository } from '../infrastructure/repository/client.database.js'

const talentRepository = new TalentRepository()
const clientRepository = new ClientRepository()

const userSocketMap = {};
let premimuUsers = {}
const initializeSocket = (server) => {
    const io = new SocketIO(server, {
        cors: {
            origin: process.env.CLIENT_ORIGIN
        },
    });

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
        if (userId != "undefined") userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("user connected", socket.id)
        socket.on('disconnect', () => {
            console.log('User disconnected');
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
        socket.on("sendNotification", async (data) => {
            try {
                const notitification = new NotificationModel({
                    recipient_id: data.recipient_id,
                    sender_id: data.sender_id,
                    content: data.content,
                    type: data.type,
                    metaData: data.metaData
                }); await notitification.save()
                const notification = await NotificationModel.find({ recipient_id: data.recipient_id })
                io.emit("recevieNotification", notification)
            } catch (error) {
                console.log('Error saving notification:', error.message)
            }
        })
        // save the subscribed users
        socket.on('newJobPost', async (jobPost) => {
            const { userData, formData } = jobPost;
            let user;

            user = await talentRepository.findById(userData.id);
            if (!user) {
                user = await clientRepository.findById(userData.id);
            }
            io.emit("newPost", { user, formData });
        });

        socket.on("subscribedUser", (data) => {
            console.log("this is the subscribed user", data)
            premimuUsers[data] = socket.id
            console.log(premimuUsers)
        });
        socket.on("getNotifications", async (recipient_id) => {
            try {
                const notification = await NotificationModel.find({ recipient_id })
                socket.emit("recevieNotification", notification)
            } catch (err) {
                console.log('Error fetching notifications:', err)
            }
        })
    })
};

export { initializeSocket, userSocketMap };
