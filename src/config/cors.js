const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
const corsConfig = cors(corsOptions)
module.exports = corsConfig;