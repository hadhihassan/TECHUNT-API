// app.ts
import express from 'express';
import 'dotenv/config';
import corsConfig from './cors.js';
import cookieParser from 'cookie-parser';
import client_Route from '../routes/client.js';
import morgan from 'morgan';
import talent_Routes from '../routes/talent.js';
import verification from '../routes/verification.js';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import '../config/googleAuth2.js'
import passport from 'passport';
import admin_Router from '../routes/admin.js';
const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/images', express.static(path.join(__dirname, '../../../images')));
  app.use(cookieParser());
  app.use(corsConfig());
  app.use(
    session({
      secret: 'your_secret_key', // Replace with a strong and secret key
      resave: false,
      saveUninitialized: false,
    })
  );


  app.use('/CLIENT', client_Route);
  app.use('/', verification);
  app.use('/TALENT', talent_Routes);
  app.use('/admin', admin_Router);



  return app;
};

export default createServer;
