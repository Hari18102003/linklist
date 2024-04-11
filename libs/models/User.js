import mongoose from "mongoose";
import { Page } from "./Page";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
