import React, {useState} from "react";
import {Link} from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";
import { FaBars } from "react-icons/fa6";
import './Navbar.css';
import Sidebar from "./Sidebar";
import {IconContext} from 'react-icons'; //pentru x-ul meniului ca sa poata fi inchis


function Navbar(){
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

    return (
        
        <>
        <IconContext.Provider value={{color:'#fff'}}>
        <div className = "navbar">
            <Link to='#' className="menu-bars">
            <FaBars  onClick={showSidebar}/>
            </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items"  onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to='#' className="menu-bars">
                    <IoIosCloseCircle />
                    </Link>
                </li>
                {Sidebar.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
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

export default Navbar;