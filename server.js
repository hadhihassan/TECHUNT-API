const express = require("express")
const app = express();
require('dotenv').config();
const corsConfig = require("./src/config/cors")
const dbConnect = require('./db')
const cookieParser = require("cookie-parser")


app.use(corsConfig)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());



const clientRoute = require('./src/routes/client')
app.use('/', clientRoute)

// const adminRouet = require('./src/routes/admin')
// app.use('/admin', adminRouet)

// const talentRouet = require('./src/routes/talent');
// app.use('/talent', talentRouet)



dbConnect()

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})


app.use((err, res, req, next) => {
    console.log(err);
    res.status(500).json({
        status: "failed",
        message: "Something went wrong!"
    });
})
module.exports = app