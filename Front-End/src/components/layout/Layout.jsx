import React from "react";
import { Sidebar } from "../Menu/Sidebar";
import { Header } from "../Menu/Header";
import {
  Outlet,
  useLocation,
  matchPath,
  
} from "react-router-dom";
import Loader from "../Loader";
import { Sidebar_Menu } from "../Menu/Sidebar";
import { useSelector } from "react-redux";
import { LoaderSelectorLoading } from "../../Redux/LoaderSelector";
import { TextField } from "@mui/material";
export const Layout = () => {
  const location = useLocation();

  const activeMenu = Sidebar_Menu.find((menu) =>
    matchPath({ path: menu.path, end: menu.path === "/" }, location.pathname)
  );

  const isLoading = useSelector(LoaderSelectorLoading);
  
  return (
    <>
      <div className="paper">
        <Loader open={isLoading} />
        <div className="flex ">
          <Sidebar />
          <div className=" w-full h-full ml-16 md:ml-56">
            <Header />
            <div className="border-v rounded-xl card  pb-0 mt-2">
              <div className="w-full flex justify-evenly  items-center MuiCard-root  h-15  my-4">
                {activeMenu && <h1>{activeMenu.name}</h1>}
                <div>
                  <TextField label="Select Project" />
                </div>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
