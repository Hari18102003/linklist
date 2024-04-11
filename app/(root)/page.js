"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const session = useSession();
  const [username, setUsername] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username);
    if (username.length > 0) {
      if (session?.status === "unauthenticated") {
        await signIn("google", { callbackUrl: `/account?username=${username}` });
      }
      else {
        router.push(`/account?username=${username}`);
      }
    } else {
      return;
    }
  }

  return (
    <div className="flex flex-col gap-6 p-5 pt-32 md:p-40">
      <h1 className="text-4xl md:text-[60px] md:leading-[66px] font-semibold">Your one link <br></br> for everything.</h1>
      <p className="text-md md:text-lg">Share your links, social profiles, contact info and <br></br> more on one page</p>
      <form onSubmit={handleSubmit} className="flex items-center shadow-md w-fit">
        <label className="bg-white pl-2 md:pl-4 py-4">
          linklist.to/
        </label>
        <input value={username} onChange={e => setUsername(e.target.value)} className="py-4 w-[140px] md:w-[200px] outline-none" type="text" placeholder="username" />
        <button type="submit" className="py-4 md:p-4 text-white bg-[#1C73E8]">Join for Free</button>
      </form>
    </div>
  );
}
