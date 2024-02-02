import express from 'express';
import 'dotenv/config';
import corsConfig from "./cors.js"
import cookieParser from "cookie-parser"
import client_Route from '../routes/client.js'
import morgan from 'morgan';
import talent_Routes from '../routes/talent.js';
import verification from '../routes/verification.js';


export const createServer = () => {
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser())
        app.use(corsConfig)
        app.use(morgan('combined'))
        app.use('/CLIENT', client_Route)
        app.use('/', verification)
        app.use('/TALENT', talent_Routes)
        return app

    } catch (error) {
        console.log('error logging from createServer, from app.ts');
        console.error('error caught from app')
    }
}