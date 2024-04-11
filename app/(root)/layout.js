import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkList - Share your Links in single link",
  description: "Nextjs application to share your links in one single link.",
  icons: {
    icon: ["/favicon.ico?v=4"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0F2F4]`}>
        <AuthContext>
          <Navbar />
          <main>
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
