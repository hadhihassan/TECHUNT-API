import mongoose from "mongoose";
const URL = process.env.DATABASE_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(URL);

    const db = mongoose.connection;

    db.once("open", () => {
      console.log("DATABASE CONNECTED");

      // Create TTL Index on 'expireAt' field with 1-minute expiration
      db.collection("tokens").createIndex(
        { expireAt: 1 },
        { expireAfterSeconds: 60 }
      );

      console.log("TTL Index created on 'expireAt' field");
    });

    db.on("error", (error) => {
      console.error("Error connecting to the database:", error);
    });
  } catch (error) {
    console.error("Error in database connection", error);
  }
};

export default connectDb;
