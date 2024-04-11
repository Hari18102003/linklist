import { connectDB } from "@/libs/db/connectDB";
import { Page } from "@/libs/models/Page";
import { User } from "@/libs/models/User";

export async function GET(req, { params }) {
    const { username } = params;
    connectDB();
    const page = await Page.findOne({ uri: username }).populate("owner");
    if (!page) {
        return Response.json({
            success: false
        });
    }
    return Response.json({
        success: true,
        page,
    });
}