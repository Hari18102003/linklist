"use client";
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Buttons } from '@/libs/constants/Buttons';

const LinkListProfilePage = ({ params }) => {

    const { username } = params;
    const router = useRouter();
    const [page, setPage] = useState("");

    useEffect(() => {
        async function getPage() {
            const { data } = await axios.get(`/api/page/${username}`);
            if (data.success) {
                setPage(data.page);
            }
            else {
                router.push("/");
            }
        }
        getPage();
    }, [router, username]);

    useEffect(() => {
        document.title = `${page.name} - LinkList`;
        return () => {
            document.title = `${page.name} - LinkList`;
        };
    }, [page]);

    const buttonKeyLinks = page.buttons ? Object.keys(page?.buttons) : [];
    const buttons = buttonKeyLinks?.map(k => Buttons.find(b => b.label === k));
    console.log(buttons);

    return (
        <div className='h-screen flex items-center w-full px-5 justify-center' style={{ backgroundColor: page?.bgcolor }} >
            <div className='flex flex-col gap-8 items-center'>
                <div className='flex flex-col items-center gap-5'>
                    <div className='relative w-32 h-32 rounded-full'>
                        <Image
                            src={page?.image}
                            alt='profile'
                            fill
                            className='rounded-full'
                        />
                    </div>
                    <div className='flex gap-1 items-center flex-col'>
                        <h1 className='text-lg text-white font-semibold'>{page.name}</h1>
                        <p className='text-sm text-gray-300 -mt-1'>{page.location}</p>
                        <p className='text-sm md:text-md text-center mt-2 text-white font-normal'>{page.bio}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    {page?.links?.map(l => (
                        <Link key={l.title} href={l.url}>
                            <div className='w-[300px] md:w-[450px] rounded-xl flex items-center justify-center py-3 bg-white shadow-md'>{l.title}</div>
                        </Link>
                    ))}
                </div>
                <div className='flex gap-5 justify-center items-center'>
                    {buttons?.map(button => (
                        <Link className='text-[30px]' key={button.id} href={page?.buttons[button.label]}>{button.icon}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LinkListProfilePage