import http from "http"
import { createServer } from "./src/infrastructure/config/app.js";
import dbConnect from './src/infrastructure/config/db.js'
import 'dotenv/config';

const PORT = process.env.PORT || 3000

const app = createServer()
dbConnect()
    .then(() => {
        if (app) {

            // Create an HTTP server with the Express app
            const server = http.createServer(app);
            server.listen(PORT, () => console.log(`listening to PORT ${PORT}`))

        } else {
            throw Error('app is undefined')
        }
    })
    .catch((err) => console.log('error while connecting to database\n', err))
