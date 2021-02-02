import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path:'/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Slideshow',
        path: '/meme/slideshow',
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title: 'Overview',
        path: '/meme/overview',
        icon: <BsIcons.BsFillLayersFill/>,
        cName: 'nav-text'
    },
    {
        title: 'About us',
        path:'/information',
        icon: <FaIcons.FaInfo/>,
        cName: 'nav-text'
    },
]