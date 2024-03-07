import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import '../config/googleAuth2.js'
import corsConfig from './cors.js';

import verification from '../routes/verification.js';
import admin_Router from '../routes/admin.js';
import chatRouter from '../routes/chat.js';
import client_Route from '../routes/client.js';
import talent_Routes from '../routes/talent.js';

const createServer = () => {
  const app = express();
  // app.use(morgan())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/images', express.static(path.join(__dirname, '../../../images')));
  app.use(cookieParser());
  app.use(corsConfig());
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

  return app;
};

export default createServer;
