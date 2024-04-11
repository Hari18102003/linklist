"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { Menu } from '@/libs/constants/Menu';
import { signOut } from 'next-auth/react';
import { LuLogOut } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import { usePathname } from 'next/navigation';

const LeftSidebar = () => {

    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get("/api/user");
            if (data.success) {
                setUser(data.user);
            }
        }
        getUser();
    }, []);

    return (
        <div className='w-[280px] md:flex flex-col hidden gap-7 items-center sticky top-0 h-screen p-10 bg-white'>
            <div className='flex flex-col gap-5 items-center'>
                <div className='relative rounded-full w-24 h-24'>
                    <Image
                        src={user?.image}
                        alt='profile'
                        fill
                        className='rounded-full'
                    />
                </div>
                <Link href={`/${user?.username}`}>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={"/images/logo.svg"}
                            width={28}
                            height={28}
                            alt='link-image'
                        />
                        <p className='text-slate-300'>/</p>
                        <h1>{user?.username}</h1>
                    </div>
                </Link>
            </div>
            <div>
                <ul className='flex flex-col gap-5'>
                    {Menu?.map(menu => (
                        <li key={menu.label}>
                            <Link href={menu.link} className={pathname === "/profile" ? `flex text-[#1C73E8] items-center gap-3` : `flex items-center gap-3`}>
                                <span className='text-lg'>{menu.Icon}</span><span className='text-md'>{menu.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className='flex mt-5 items-center gap-3' onClick={() => signOut({ callbackUrl: "/" })}><LuLogOut className='text-lg' /><span>Logout</span></button>
                <hr className='mt-5'></hr>
            </div>
            <Link className='flex items-center gap-3 text-sm' href={"/"}><FaArrowLeft /><span>Back to website</span></Link>
        </div>
    )
}

export default LeftSidebar