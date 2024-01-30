const mongoose = require("mongoose");
const URL = process.env.DATABASE_URL;

const connectDb = async () => {
    try {
        mongoose
            .connect(URL)
            .then(() => console.log('DATABASE CONNECTED'))
            .catch(error => console.error('Error connecting to the database:', error));
    } catch (error) {
        console.error("Error in database connection", error);
    }
};

module.exports = connectDb;
