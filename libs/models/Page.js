import mongoose from "mongoose";
import { User } from "./User";

const pageSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: ""
    },
    bgcolor: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    buttons: {
        type: Object,
        default: {}
    },
    links: [
        {
            title: String,
            url: String
        }
    ]
}, { timestamps: true });

export const Page = mongoose.models?.Page || mongoose.model("Page", pageSchema);
