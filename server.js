// server.js
import http from 'http';
import createServer from './src/infrastructure/config/app.js';
import dbConnect from './src/infrastructure/config/db.js';
import 'dotenv/config';
import { Server as socket } from 'socket.io';

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
      })
      
      server.listen(PORT, () => console.log(`listening to PORT ${PORT}`));
    } else {
      throw new Error('app is undefined');
    }
  })
  .catch((err) => console.error('error while connecting to database\n', err));
