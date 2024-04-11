import { connectDB } from "@/libs/db/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/libs/models/User";

export async function GET(req) {
    connectDB();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email }).populate("page");
    if (!user) {
        return Response.json(
            {
                success: false
            }
        );
    }
    return Response.json(
        {
            success: true,
            user
        }
    );
}