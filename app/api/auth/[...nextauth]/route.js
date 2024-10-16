import { connectDB } from "@/libs/db/connectDB";
import { User } from "@/libs/models/User";
import NextAuth from "next-auth";
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
            try {
                // Only proceed if the profile exists.
                if (profile) {
                    await connectDB();
                    // Check if the user exists in the database.
                    let user = await User.findOne({ email: profile.email });

                    // Create the user if they don't exist.
                    if (!user) {
                        user = await User.create({
                            name: profile.name,
                            image: profile.picture,
                            email: profile.email,
                        });
                    }

                    return true; // Allow the sign-in process.
                }
                return false; // Reject the sign-in if no profile.
            } catch (error) {
                console.error("Error during sign-in callback:", error);
                return false; // Fail gracefully if an error occurs.
            }
        },
        async session({ session, user }) {
            // You can add custom properties to the session object here if needed.
            return session;
        }
    }
};

// Initialize NextAuth with the configuration options.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
