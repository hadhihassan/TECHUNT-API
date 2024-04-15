// server.js
import http from 'http';
import createServer from './src/infrastructure/config/app.js';
import dbConnect from './src/infrastructure/config/db.js';
import 'dotenv/config';
import { initializeSocket } from './src/infrastructure/Socket/socket.js';

const PORT = process.env.PORT || 3000;
const app = createServer();

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}
dbConnect()
  .then(() => {
    if (app) {
      const server = http.createServer(app);
      initializeSocket(server)
      server.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    } else {
      throw new Error('app is undefined');
    }
  })
  .catch((err) => console.error('error while connecting to database\n', err));
