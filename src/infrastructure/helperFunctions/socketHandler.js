import { Server as socket } from 'socket.io';
import notificaitonModel from '../../entites/models/subSchema/notification.schema.js';

const initializeSocket = (server) => {
    const io = new socket(server, {
        cors: {
            origin: 'https://techunt.vercel.app/'
        }
    });

    io.on("connection", (socket) => {
        console.log("user connected", socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on("sendNotification", async (data) => {
            console.log("notification received:", data);
            try {
                const notification = new notificaitonModel({
                    recipient_id: data.recipient_id,
                    sender_id: data.sender_id,
                    content: data.content,
                    type: data.type,
                    metaData: data.metaData
                });
                await notification.save();

                const notifications = await notificaitonModel.find({ recipient_id: data.recipient_id });
                io.emit("receiveNotification", notifications);
            } catch (error) {
                console.log('Error saving notification:', error.message);
            }
        });

        socket.on("getNotifications", async (recipient_id) => {
            try {
                const notifications = await notificaitonModel.find({ recipient_id });
                socket.emit("receiveNotification", notifications);
            } catch (err) {
                console.log('Error fetching notifications:', err);
            }
        });
    });
};

export default initializeSocket;
