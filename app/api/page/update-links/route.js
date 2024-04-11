import { connectDB } from "@/libs/db/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";
import { Page } from "@/libs/models/Page";

export async function PUT(req) {
    connectDB();
    const { links } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    await Page.findOneAndUpdate({ uri: user.username }, { links: links }, { new: true });
    return Response.json({
        success: true
    });
}