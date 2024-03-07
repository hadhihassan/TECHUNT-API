// server.js
import http from 'http';
import createServer from './src/infrastructure/config/app.js';
import dbConnect from './src/infrastructure/config/db.js';
import 'dotenv/config';
import { Server as socket } from 'socket.io';
import notificaitonModel from './src/entites/models/subSchema/notification.schema.js'
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3000;
const app = createServer();

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
let io
const userSocketMap = {}
dbConnect()
  .then(() => {
    if (app) {
      const server = http.createServer(app);



      // socket.io codes for notifications 
      io = new socket(server, {
        cors: {
          origin: 'http://localhost:5173'
        },
      })
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
          console.log("notification received :", data)
          try {
            const notitification = new notificaitonModel({
              recipient_id: data.recipient_id,
              sender_id: data.sender_id,
              content: data.content,
              type: data.type,
              metaData: data.metaData
            }); await notitification.save()
            const notification = await notificaitonModel.find({ recipient_id: data.recipient_id })
            io.emit("recevieNotification", notification)
          } catch (error) {
            console.log('Error saving notification:', error.message)
          }
        })
        socket.on("getNotifications", async (recipient_id) => {
          try {
            const notification = await notificaitonModel.find({ recipient_id })
            socket.emit("recevieNotification", notification)
          } catch (err) {
            console.log('Error fetching notifications:', err)
          }
        })
      })

      // WebSocket code for chat
      // const wss = new WebSocketServer({server});
      // wss.on('connection', (ws) => {
      //   console.log('WebSocket client connected');

      //   // Handle incoming messages from WebSocket clients
      //   ws.on('message', (message) => {
      //     console.log(`Received message from WebSocket client bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb: ${message}`);
      //   });

      //   // Handle WebSocket client disconnection
      //   ws.on('close', () => {
      //     console.log('WebSocket client disconnected ');
      //   });
      // });


      server.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    } else {
      throw new Error('app is undefined');
    }
  })
  .catch((err) => console.error('error while connecting to database\n', err));
  
  export { io } 