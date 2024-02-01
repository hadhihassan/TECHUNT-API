import express from 'express';
import 'dotenv/config';
import corsConfig from "./cors.js"
import cookieParser from "cookie-parser"
import clientRoute from '../routes/client.js'

export const createServer = () => {
    try {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser())
        app.use(corsConfig)

        app.use('/', clientRoute)
        return app

    } catch (error) {
        console.log('error logging from createServer, from app.ts');
        console.error('error caught from app')
    }
}