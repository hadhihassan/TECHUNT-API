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

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/images', express.static(path.join(__dirname, '../../../images')));
  app.use(cookieParser());
  app.use(corsConfig);
  app.use(
    session({
      secret: 'your_secret_key', // Replace with a strong and secret key
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(morgan());
  app.use('/CLIENT', client_Route);
  app.use('/', verification);
  app.use('/TALENT', talent_Routes);

  return app;
};

export default createServer;
