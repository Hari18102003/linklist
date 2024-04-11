import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMobileButton } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export const Buttons = [
    {
        id: 1,
        label: "Facebook",
        icon: <MdFacebook />,
        placeholder: "Facebook Link"
    },
    {
        id: 2,
        label: "Instagram",
        icon: <FaInstagram />,
        placeholder: "Instagram Link"
    },
    {
        id: 3,
        label: "Youtube",
        icon: <FaYoutube />,
        placeholder: "Youtube Link"
    },
    {
        id: 4,
        label: "Mobile",
        icon: <FaMobileButton />,
        placeholder: "Mobile Number"
    },
    {
        id: 5,
        label: "Gmail",
        icon: <MdEmail />,
        placeholder: "Gmail"
    },
    {
        id: 6,
        label: "GitHub",
        icon: <FaGithub />,
        placeholder: "GitHub Link"
    },
    {
        id: 7,
        label: "Telegram",
        icon: <FaTelegram />,
        placeholder: "Telegram Link"
    }
];