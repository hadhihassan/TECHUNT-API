import mongoose from "mongoose"
const password = process.env.AlTAS_PASSWORD;
const URL = process.env.DATABASE_URL
// const connectionString = `mongodb+srv://HADHI:<${password}>@devcluster.u8o7ney.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`
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
