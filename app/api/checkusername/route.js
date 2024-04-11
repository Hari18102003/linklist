import { connectDB } from "@/libs/db/connectDB";
import { User } from "@/libs/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Page } from "@/libs/models/Page";

export async function PUT(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const currentUser = await User.findOne({ email });
    const { username } = await req.json();
    const user = await User.findOne({ username });
    if (user) {
        return Response.json({
            success: false
        });
    }
    const page = await Page.create({ uri: username, owner: currentUser._id });
    await User.findOneAndUpdate({ email }, { username: username, page: page._id }, { new: true });
    return Response.json({
        success: true
    });
}