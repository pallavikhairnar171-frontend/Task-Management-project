import React, { useState } from 'react'
import { LuBox, LuAArrowDown,LuCalendarDays,LuAppWindow,LuUsersRound  ,LuBadgeDollarSign ,LuReceiptText ,LuUserCog ,LuSettings    } from "react-icons/lu";
import { Link } from 'react-router-dom';

 export const Sidebar_Menu = [
        {id:1,path:'/', name:"Dashboard" ,icon:LuAArrowDown},
        {id:2,path:'/project', name:"Project" ,icon:LuAppWindow },
        {id:3,path:'/task-track', name:"Track-Task" ,icon:LuCalendarDays},
        {id:4,path:'/', name:"Work" ,icon:LuBadgeDollarSign },
        {id:5,path:'/', name:"Download" ,icon:LuReceiptText },
        {id:7,path:'/', name:"User" ,icon:LuUserCog },
        {id:8,path:'/', name:"Add-User" ,icon:LuUsersRound },
        {id:6,path:'/', name:"Setting" ,icon:LuSettings },
    ]
export const Sidebar = () => {
    const [activeLink,setActiveLink] = useState(0)
   
const handelLinkActive =(index)=>{
    setActiveLink(index)
}

  return (
    <div className='sidebar w-16 md:w-45 fixed left-0 top-0 z-10 h-screen shadow-xl  pt-8 px-4   rounded-xl'>
        {/* logo */}
        <div className='mb-8'>
            <img src="/Logo-Designing.jpg" alt="" className='w-10 h-10 rounded-full hidden md:flex' />
            <img src="/vite.svg" alt="" className='w-15 h-15 rounded-full flex md:hidden' />
        </div>
        <ul className='mt-6 space-y-2 text-theme'>
            {Sidebar_Menu.map((link,index)=>{
                return(
                    <li key={index} className={`font-medium rounded-md py-2 px-5 sidebar-item ${activeLink === index ? 'active' : ""}`}>
                    <Link to={link.path} className='flex  justify-center md:justify-start items-center md:space-x-5' onClick={()=>handelLinkActive(index)}>
                    <span className='sidebar-icon'><link.icon/></span>
                    <span className={`text-xs  hidden  md:flex  ${activeLink === index ? 'active' : ""}`}>{link.name}</span>
                    </Link>
                </li>
                )
            })}
        </ul>

        <div className="w-full absolute bottom-5 left-0 px-4   cursor-pointer text-center">
            <p className='flex items-center text-white font-bold space-x-2 justify-center bg-linear-to-r from-purple-600 to-pink-500  text-xs py-2 rounded-full '>
                <span>?</span> <span>Need Help ?</span>
            </p>
        </div>
    </div>
  )
}
