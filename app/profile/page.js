"use client";
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import { IoReorderTwoOutline } from "react-icons/io5";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { Buttons } from '@/libs/constants/Buttons';
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProfilePage = () => {

    const [color, setColor] = useState("");
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [file, setFile] = useState("");
    const [previews, setPreviews] = useState();
    const [links, setLinks] = useState([]);

    const [selectedButtons, setSelectedButtons] = useState([]);
    const [remainingButtons, setRemainingButtons] = useState(Buttons);


    const session = useSession();
    const router = useRouter();
    const { status } = session;

    useEffect(() => {
        if (!file) return;
        let tmp = [];
        tmp.push(URL.createObjectURL(file));
        const objectUrls = tmp[0];
        setPreviews(objectUrls);
        return URL.revokeObjectURL(objectUrls[0]);
    }, [file]);

    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get("/api/user");
            if (data.success) {
                setUser(data.user);
                setPage(data.user.page);
                setLinks(data.user.page.links || []);
                setName(data.user.page.name);
                setLocation(data.user.page.location);
                setColor(data.user.page.bgcolor ? data.user.page.bgcolor : "#9CA3AF");
                setBio(data.user.page.bio);
            }
        }
        getUser();
    }, []);

    useEffect(() => {
        const pageSavedKeys = page?.buttons ? Object.keys(page?.buttons) : [];
        console.log(pageSavedKeys)
        const pageSavedBtnInfo = pageSavedKeys?.map(k => Buttons.find(k1 => k1.label === k));
        console.log(pageSavedBtnInfo);
        setSelectedButtons(pageSavedBtnInfo);
    }, [page.buttons]);

    function handleAddButton(button) {
        setSelectedButtons(state => {
            if (!selectedButtons.includes(button)) {
                return [...state, button]
            }
            return state;
        });
        setRemainingButtons(state => state.filter(item => item !== button));
    }

    function handleDeleteBtn(button) {
        setSelectedButtons(state => state.filter(item => item !== button));
        setRemainingButtons(state => [...state, button]);
    }

    async function handleButtonSubmission(FormData) {
        console.log(FormData);
        const buttons = {};
        FormData.forEach((value, key) => {
            buttons[key] = value;
        });
        const { data } = await axios.put("/api/page/update-btn", { buttons });
        if (data.success) {
            toast.success("Buttons Saved");
        }
    }

    function handleAddNewLink() {
        setLinks(state => [...state, { id: Date.now().toString(), title: "", url: "" }]);
    }
    function handleDeleteLink(id, e) {
        e.preventDefault();
        setLinks(() => {
            return links.filter(l => l.id !== id)
        });
    }

    async function handlePersonalDetailsSubmission(e) {
        e.preventDefault();
        if (file) {
            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("upload_preset", "linklist");
            fileData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, fileData);
            const result = await axios.put("/api/page/update", { color, name, location, bio, image: data.url });
            if (result.data.success) {
                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);
            }
        } else {
            const result = await axios.put("/api/page/update", { color, name, location, bio, image: user?.page?.image ? user?.page?.image : user?.image });
            if (result.data.success) {
                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);
            }
        }

    }

    async function handleLinkSubmission(e) {
        e.preventDefault();
        const { data } = await axios.put("/api/page/update-links", { links });
        if (data.success) {
            toast.success("Links Saved");
        }
        console.log(links);
    }

    function handleChangeLink(key, prop, e) {
        setLinks(prev => {
            const newLinks = [...prev];
            newLinks.forEach(l => {
                if (l.id === key) {
                    l[prop] = e.target.value;
                }

            });
            return [...prev];
        })
    }

    if (status === "unauthenticated") {
        router.push("/");
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='bg-white pb-3'>
                <form onSubmit={handlePersonalDetailsSubmission}>
                    <div className='flex items-center justify-center w-full relative h-[200px] md:h-[300px]' style={{ backgroundColor: color }}>
                        <div className='absolute rounded-full border-2 p-1 md:left-[520px] bg-white -bottom-20'>
                            <div className='relative w-28 h-28 md:w-32 md:h-32 rounded-full'>
                                <Image
                                    src={previews ? previews : (user?.page?.image ? user?.page?.image : user?.image)}
                                    fill
                                    alt='profile'
                                    className='rounded-full'
                                />
                                <label htmlFor='file'><FaCloudUploadAlt className='absolute bottom-0 right-0 text-[40px] bg-white p-1 border-2 rounded-full' /></label>
                                <input
                                    id='file'
                                    className='hidden'
                                    type='file'
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className='bg-[#F0F2F4] p-1 flex items-center justify-center gap-2'>
                            <label>Background Color : </label>
                            <input type='color' value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                    </div>

                    <div className='mt-16 flex p-2 flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-gray-400 font-medium'>
                                DISPLAY NAME
                            </label>
                            <input value={name} onChange={e => setName(e.target.value)} className='bg-[#F0F2F4] outline-none p-2' type='text' placeholder='Name' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-gray-400 font-medium'>
                                LOCATION
                            </label>
                            <input value={location} onChange={e => setLocation(e.target.value)} className='bg-[#F0F2F4] outline-none p-2' type='text' placeholder='Location' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm text-gray-400 font-medium'>
                                BIO
                            </label>
                            <textarea value={bio} onChange={e => setBio(e.target.value)} className='bg-[#F0F2F4] outline-none p-2' resize="none" placeholder='Bio' rows={3} cols={10} />
                        </div>
                    </div>
                    <button type='submit' className='flex px-10 py-2 mt-2 text-white mx-auto bg-[#1C73E8] items-center gap-2'><IoSaveSharp />Save</button>
                </form>
            </div>

            {/* Button */}

            <div className='bg-white p-2'>
                <form action={handleButtonSubmission}>
                    <h1 className='text-xl font-semibold'>Buttons</h1>
                    <div className='mt-3 p-2 flex flex-col gap-3'>
                        {selectedButtons?.map(button => (
                            <div key={button.id} className='flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between'>
                                <div className='flex items-center gap-2 md:gap-5'>
                                    <IoReorderTwoOutline />
                                    <div className='flex items-center gap-1 md:gap-2'>
                                        <div className='text-xl'>
                                            {button.icon}
                                        </div>
                                        <span>{button.label}</span>
                                    </div>
                                </div>
                                <div className='md:w-[900px] flex items-center'>
                                    {/* page?.buttons[button.label] */}
                                    <input defaultValue={page?.buttons ? page?.buttons[button.label] : ""} name={button.label} type='text' className='bg-[#F0F2F4] outline-none w-full p-2' placeholder={button.placeholder} />
                                    <button onClick={() => handleDeleteBtn(button)} className='p-3 text-black text-lg bg-gray-400'>
                                        <RiDeleteBin7Fill />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='my-3'></hr>
                    <div className='flex flex-wrap items-center gap-3 p-2'>
                        {remainingButtons.map(button => (
                            <button onClick={() => handleAddButton(button)} className='flex bg-[#F0F2F4] p-2 text-black items-center gap-1' key={button.id}><span>{button.icon}</span>{button.label}<span className='text-lg'><FaPlus /></span></button>
                        ))}
                    </div>
                    <hr className='my-3'></hr>
                    <button type='submit' className='flex px-10 py-2 mt-2 text-white mx-auto bg-[#1C73E8] items-center gap-2'><IoSaveSharp />Save</button>
                </form>
            </div>

            {/* Links */}

            <div className='bg-white p-2'>
                <form onSubmit={handleLinkSubmission}>
                    <h1 className='text-xl font-semibold'>Links</h1>
                    <button type='button' onClick={handleAddNewLink} className='flex mt-2 items-center gap-2 text-lg text-[#1C73E8]'><FaPlusCircle /><span>Add new</span></button>
                    <div className='flex flex-col gap-2 mt-3'>
                        {links?.map(l => (
                            <div key={l.id} className='flex gap-2 p-2'>
                                <input value={l.title} onChange={e => handleChangeLink(l.id, 'title', e)} className='w-full p-2 bg-[#F0F2F4] outline-none' type='text' placeholder='TITLE' />
                                <input value={l.url} onChange={e => handleChangeLink(l.id, 'url', e)} className='w-full bg-[#F0F2F4] p-2 outline-none' type='text' placeholder='URL' />
                                <button onClick={(e) => handleDeleteLink(l.id, e)} className='p-3 text-black text-lg bg-gray-400'>
                                    <RiDeleteBin7Fill />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type='submit' className='flex px-10 py-2 mt-2 text-white mx-auto bg-[#1C73E8] items-center gap-2'><IoSaveSharp />Save</button>
                </form>
            </div>
        </div>

    )
}

export default ProfilePage