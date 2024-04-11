import { connectDB } from "@/libs/db/connectDB";
import { User } from "@/libs/models/User";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ profile }) {
            if (profile) {
                connectDB();
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    await User.create({ name: profile.name, image: profile.picture, email: profile.email });
                }
                return true;
            }
        },
        async session({ session }) {
            return session;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }