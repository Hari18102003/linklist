"use client";
import axios from 'axios';
import Link from "next/link"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AccountPage = ({ searchParams }) => {

    const session = useSession();
    const { status } = session;
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { username } = searchParams;
    const [name, setName] = useState(username);
    const [hasPage, setHasPage] = useState(null);

    useEffect(() => {

        async function userHasPage() {
            if (status === "authenticated") {
                const { data } = await axios.get("/api/userhaspage");
                setHasPage(data.success);
            }
        }
        userHasPage();


    }, [status, success]);

    async function handleCheck(e) {
        e.preventDefault();
        setError("");
        if (name.length < 3) {
            setError("Minimum 3 characters");
            return;
        }
        const { data } = await axios.put("/api/checkusername", { username: name });
        if (!data.success) {
            setError("This Username is Taken");
        } else {
            setSuccess(true);
            router.push("/account");
        }
    }

    if (status === "unauthenticated") {
        router.push("/");
    }

    return (
        <>
            {!hasPage && (
                <div className='flex justify-center py-10'>
                    <form onSubmit={handleCheck} className='flex flex-col items-center gap-7'>
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className='text-3xl font-semibold'>Grab Your Username</h1>
                            <p>Choose your username</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <input className='px-10 py-3 rounded-sm text-center' placeholder='username' value={name} onChange={e => setName(e.target.value)} />
                            {error && <p className='py-3 bg-red-200 border border-red-500 text-center'>{error}</p>}
                            <button className='px-10 py-3 rounded-sm bg-[#1C73E8] text-white'>Claim Username</button>
                        </div>
                    </form>
                </div>
            )}
            {hasPage && (
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-center text-xl md:text-3xl mt-5'>You already have a Page!</h1>
                    <Link href={"/profile"} className='p-3 rounded-md bg-white'><button>Go to my page</button></Link>
                </div>
            )}
        </>

    )
}

export default AccountPage