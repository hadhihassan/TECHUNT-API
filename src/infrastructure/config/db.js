import mongoose from "mongoose"
const URL = process.env.DATABASE_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGO_DB_UERNAME,
    pass: process.env.MONGO_DB_PASSWORD
}
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

export default connectDb;
