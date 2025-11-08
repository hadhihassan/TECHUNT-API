import mongoose from "mongoose"
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectDb;
