import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        console.log("Database is already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to DB!", error);
    }
}
