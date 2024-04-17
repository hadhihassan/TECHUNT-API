// import { MongoClient } from 'mongodb'

// const username = process.env.ATLAS_USERNMAE; 
// const password = process.env.ATLES_PASSWORD; 
// const dbName = process.env.ATLAS_DATABASE_NAME;
// const clusterUrl = process.env.ATLAS_clusterUrl;
// const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=${dbName}`;

// const client = new MongoClient(uri);

// async function dbConnect() {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB Atlas");
//         await client.db(dbName).command({ ping: 1 });
//         console.log("Ping successful");
//     } catch (error) {
//         console.error("Error connecting to MongoDB Atlas:", error);
//     }
// }
// export default dbConnect;


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