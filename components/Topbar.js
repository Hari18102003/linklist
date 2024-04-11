"use client";
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Menu } from '@/libs/constants/Menu';
import { LuLogOut } from 'react-icons/lu';
import { signOut } from 'next-auth/react';
import { FaArrowLeft } from 'react-icons/fa';
import { usePathname } from 'next/navigation';


const Topbar = () => {

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
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger className='bg-white flex text-lg gap-2 mb-2 items-center px-5 py-2 rounded-xl'><IoIosMenu /><span>Menu</span></SheetTrigger>
                <SheetContent className="bg-white" side={"left"}>
                    <SheetHeader>
                        <div className='flex flex-col items-center gap-5'>
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
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default Topbar