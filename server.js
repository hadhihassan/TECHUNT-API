// server.js
import http from 'http';
import createServer from './src/infrastructure/config/app.js';
import dbConnect from './src/infrastructure/config/db.js';
import 'dotenv/config';
import { Server as socket } from 'socket.io';
import notificaitonModel from './src/entites/models/subSchema/notification.schema.js'
const PORT = process.env.PORT || 3000;

const app = createServer();
dbConnect()
  .then(() => {
    if (app) {
      // Create an HTTP server with the Express app
      const server = http.createServer(app);
      const io = new socket(server, {
        cors: {
          origin: 'http://localhost:5173'
        },

      })
      io.on("connection", (socket) => {
        console.log("user connected", socket.id)
        socket.on('disconnect', () => {
          console.log('User disconnected');
        });
        socket.on("sendNotification", async (data) => {
          console.log("notificaiton recevied :", data)
          try {

            const notitification = new notificaitonModel({
              recipient_id: data.recipient_id,
              sender_id: data.sender_id,
              content: data.content,
              type: data.type,
              metaData : data.metaData
            });await notitification.save()

            // io.emit("recevieNotification", {_id:notitification._id, message:data.content})
            const notification = await notificaitonModel.find({recipient_id : data.recipient_id})
            io.emit("recevieNotification",notification )

          } catch (error) {
            console.log('Error saving notification:',error.message)
          }
        })
        socket.on("getNotifications",async (recipient_id) => {
          try{
            const notification = await notificaitonModel.find({recipient_id})
            socket.emit("recevieNotification",notification)
          }catch(err){
            console.log( 'Error fetching notifications:', err)
          }
        })
      })


      server.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    } else {
      throw new Error('app is undefined');
    }
  })
  .catch((err) => console.error('error while connecting to database\n', err));
