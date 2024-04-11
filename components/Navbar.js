"use client";
import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";

const Navbar = () => {

    const session = useSession();
    console.log(session);
    console.log(session?.status);

    return (
        <nav className='bg-white w-full md:px-40 px-2 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <Image
                    src={"/images/logo.svg"}
                    width={36}
                    height={36}
                    alt='logo'
                />
                <h1 className='text-2xl text-[#1C73E8] font-bold'>LinkList</h1>
            </div>
            {session?.status === "unauthenticated" ? (
                <div className='flex gap-3 md:gap-12'>
                    <button className='text-sm md:text-md' onClick={() => signIn("google", { callbackUrl: "/account" })}>Sign In</button>
                    <button className='text-sm md:text-md' onClick={() => signIn("google", { callbackUrl: "/account" })}>Create Account</button>
                </div>
            ) : (
                <div className='flex items-center gap-2 md:gap-12 text-sm md:text-md'>
                    <h1>{`${session?.data?.user?.name.split(" ")[0]} ${session?.data?.user?.name.split(" ")[1]}`}</h1>
                    <button className='flex items-center gap-2' onClick={() => signOut()}>Logout<FiLogOut /></button>
                </div>
            )}
        </nav>
    )
}

export default Navbar