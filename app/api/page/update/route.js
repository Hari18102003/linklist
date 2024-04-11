import { connectDB } from "@/libs/db/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";
import { Page } from "@/libs/models/Page";

export async function PUT(req) {
    connectDB();
    const { color, image, name, bio, location } = await req.json();
    if (!name || !bio || !location) {
        return Response.json({
            success: false,
            message: "All are mandatory!"
        });
    }
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    await Page.findOneAndUpdate({ uri: user.username }, { bgcolor: color, image, name, location, bio }, { new: true });
    return Response.json({
        success: true,
        message: "Saved"
    });
}