import React, { useState } from "react";
import { GoBell } from "react-icons/go";
import { SetThemeComponent } from "./SetThemeComponent";
import { useDispatch, useSelector, } from "react-redux";
import { Thememodel } from "../Models/thememodel";
import { MdDarkMode } from "react-icons/md";
import { DynamicDialogBox } from "../Models/dynamicDialogBox";
import { DynamicForm } from "../forms/DynamicForm";
import { ThemeFormData } from "../../Services/FieldsConfigration";
import { createTheme, updateTheme } from "../../Redux/Slice/themeSlice";

export function Header() {
  const  user  = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme);
  // console.log(theme._id)
  const [openThemeModal, setOpenThemeModal] = useState(false);
  const themeInitialValues = {
    name: "Light Dashboard",
    mode: "light",
    buttonType: "outlined",
    inputType: "outlined",

    colors: {
      background: {
        main: "#F8FAFC", // app background
        paper: "#FFFFFF", // pages
        card: "#F1F5F9", // cards
      },

      sidebar: {
        background: "#FFFFFF",
        text: "#334155",
        icon: "#64748B",

        active: {
          background: "#E0F2FE",
          text: "#0F172A",
          icon: "#0284C7",
        },

        hover: {
          background: "#F1F5F9",
          text: "#0F172A",
          icon: "#0369A1",
        },

        border: "#E2E8F0",
      },

      text: {
        primary: "#0F172A",
        secondary: "#475569",
        disabled: "#94A3B8",
      },

      button: {
        primary: {
          background: "#0284C7",
          text: "#FFFFFF",
          hover: "#0369A1",
          border: "#0284C7",
        },

        secondary: {
          background: "#FFFFFF",
          text: "#0284C7",
          hover: "#E0F2FE",
          border: "#0284C7",
        },
      },

      icon: {
        default: "#64748B",
        active: "#0284C7",
        disabled: "#CBD5E1",
      },

      border: {
        default: "#E2E8F0",
        focus: "#0284C7",
      },
    },
  };

  const actions = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpenThemeModal(false);
        close(); // ✅ animated close
      },
    },
    // {
    //   label: "Yes",
    //   variant: "contained",
    //   onClick: async (close) => {
    //     console.log("Saved");
    //     await handelDeleteProject(selectedProjectID);
    //     close();
    //   },
    // },
  ];
  const handelAfterClose = () => {

  };
  const handelSubmitData =  async (formData) => {
     
    if(theme?._id){
      const payload ={
        userId:user.user._id,
        themeId:theme._id,
        ...formData
      }
      await dispatch(updateTheme(payload))
      setOpenThemeModal(false)
    }else{
      const payload ={
        userId:user?.user?._id,
               ...formData
      }
     console.log()
      await dispatch(createTheme(payload))
      setOpenThemeModal(false)
      console.log("this header component",payload);
    }
  };
  return (
    <>
      <div
        style={{ borderBottom: "solid 1px gray" }}
        className="flex sticky w-full paper z-20 top-0 start- justify-between items-center p-4 border-b-gray-500"
      >
        <div>
          <h1 className="text-xs">Welcome Back!</h1>
          <p className="text-xl font-medium">{user.user.name}</p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-indigo-600"
            />
          </div>
          <div className="flex items-center space-x-5">
            <button className="relative text-2xl text-gray-800">
              <GoBell size={32} />
              <span className="absolute top-0 right-0 -mt-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
                9
              </span>
            </button>
            <button
              onClick={() => setOpenThemeModal(true)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {" "}
              <MdDarkMode size={20} />
            </button>
            <DynamicDialogBox
              open={openThemeModal}
              title="Theme Form"
              actions={actions}
              onClose={() => handelAfterClose}
            >
              <DynamicForm
                initialValues={ themeInitialValues}
                fields={ThemeFormData}
                onSubmit={(formData) => handelSubmitData(formData)}
              />
            </DynamicDialogBox>

            <img
              className="h-10 w-10 rounded-full"
              src="/Logo-Designing.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
