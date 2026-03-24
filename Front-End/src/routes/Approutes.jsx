import React from "react";
import { Route, Routes } from "react-router-dom";
import { Register } from "../components/auth/Register";
import {Login} from "../components/auth/Login"
import { Home } from "../Pages/Home";
import { OtpVerification } from "../components/auth/OtpVerification";
import { Authentication } from "./Authentication";
import { Thememodel } from "../components/Models/thememodel";
import { Project } from "../Pages/Project";

import {
  LuBox,
  LuAArrowDown,
  LuCalendarDays,
  LuAppWindow,
  LuUsersRound,
  LuBadgeDollarSign,
  LuReceiptText,
  LuUserCog,
  LuSettings,
} from "react-icons/lu";
import { TaskPage } from "../Pages/TaskPage";
import { Layout } from "../components/layout/Layout";


export const Approutes = () => {
  
  const Sidebar_Menu = [
    { id: 1, path: "/", name: "Dashboard", icon: LuAArrowDown ,title:"Dashboard", component:Home},
    { id: 2, path: "/project", name: "Project", icon: LuAppWindow ,title:"Project",component:Project},
    { id: 3, path: "/task-track", name: "Task Management", icon: LuCalendarDays,title:"Task" ,component:TaskPage},
    { id: 4, path: "/Work", name: "Work", icon: LuBadgeDollarSign,title:"Work" },
    { id: 5, path: "/Download", name: "Download", icon: LuReceiptText,title:"Dashboard" },
    { id: 7, path: "/Add-User", name: "User", icon: LuUserCog,title:"Task" },
    { id: 8, path: "/User", name: "Add-User", icon: LuUsersRound,title:"Dashboard" },
    { id: 6, path: "/Add-User", name: "Setting", icon: LuSettings,title:"Project" },
  ];

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verify" element={<OtpVerification />} />
      <Route element={<Authentication />}>
        <Route  element={<Layout />}>
          {
            Sidebar_Menu.map((menu,index)=>(
              <Route path={menu.path} index key={index} element={<menu.component/>}
              context={{ title: menu.title }}
     />

            ))
          }
          {/* <Route path="/project" element={<Project />}
          context={{ title: "Project" }}
 /> */}
        </Route>
      </Route>
      
    </Routes>
  );
};
