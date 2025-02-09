import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {SidebarData} from "../js/SidebarData";
import {IconContext} from "react-icons";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../css/Navbar.css'
import Logo from '../logo.jpg';


export default function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value ={{color: '#fff'}}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars
                        onClick={showSidebar}
                    />
                </Link>
                <div className='team'><p className='team-1'>Memes</p></div>

                <img src={Logo} alt='loge' className='logoImage'/>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' >
                    <li className='navbar-toggle'>
                        <Link to="#" className="menu-bar " onClick={showSidebar}>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                    {SidebarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to = {item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>

    )
}
