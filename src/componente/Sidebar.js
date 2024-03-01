import React from "react";

import { IoIosHome } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

export const Sidebar = [
   {
    title: 'Home',
    path:'/home',
    icon: <IoIosHome />,
    cName: 'nav-text'
   },
   {
    title: 'Prieteni',
    path:'/prieteni',
    icon: <FaUserFriends />,
    cName: 'nav-text'
   },
   {
    title: 'Lista mea',
    path:'/lista_mea',
    icon: <FaClipboardList />,
    cName: 'nav-text'
   },
   {
    title: 'Produse',
    path:'/produse',
    icon: <IoFastFood />,
    cName: 'nav-text'
   },
   {
      title: 'Sign out',
      path:'/',
      icon: <FaSignOutAlt />,
      cName: 'nav-text'
     },
]

export default Sidebar;

