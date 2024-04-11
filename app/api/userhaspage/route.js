import { connectDB } from "@/libs/db/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";
import { Page } from "@/libs/models/Page";

export async function GET(req) {

    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });
    const page = await Page.findOne({ uri: user.username });

    if (page) {
        return Response.json({
            success: true
        });
    }

    return Response.json({
        success: false
    });
}