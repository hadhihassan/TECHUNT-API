import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import '../config/googleAuth2.js'


import verification from '../routes/verification.js';
import admin_Router from '../routes/admin.js';
import chatRouter from '../routes/chat.js';
import client_Route from '../routes/client.js';
import talent_Routes from '../routes/talent.js';

const createServer = () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
      credentials: true,
    })
  );

  app.options(
    "*",
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/images', express.static(path.join(__dirname, '../../../images')));
  app.use(cookieParser());
  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use('/CLIENT', client_Route);
  app.use('/', verification);
  app.use('/TALENT', talent_Routes);
  app.use('/admin', admin_Router);
  app.use('/message/', chatRouter);
  app.use((err, req, res, next) => {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong!"
    });
  });
  app.get("/test",(req,res)=>{
    cosnole.log("working")
    res.status(200).send("sucess")
  })
  app.post('/webhook', async (req, res) => {
    const event = req.body;
    console.log(event)
  })

  return app;
};

export default createServer;
