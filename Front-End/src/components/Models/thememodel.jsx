import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, updateTheme } from "../../Redux/Slice/themeSlice";

export const Thememodel = ({  onClose }) => {
  const dispatch = useDispatch();

  const { loading, success, theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  console.log(loading, success, theme, "------theme", user, "themeModel");
  const [formData, setFormData] = useState({
    name:theme?.name?theme?.name:"",
    key:theme?.key?theme?.key:"",
    background:theme?.background?theme?.background:"",
    typeButton:theme?.typeButton?theme?.typeButton:"",
    bgBotton:theme?.bgBotton?theme?.bgBotton:"",
    text:theme?.text?theme?.text:"",
    primary:theme?.primary?theme?.primary:"",
    sidbarBg:theme?.sidbarBg?theme?.sidbarBg:"",
    headColor:theme?.headColor?theme?.headColor:"",
    iconC:theme?.iconC?theme?.iconC:""
  });
  console.log(formData,"==to test===")
  const handelOnchange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "----------");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelsave = () => {
    const data = {
      ...formData,
      userId: user._id,
      themeId: theme?._id,
    };
    if (theme?._id) {
      dispatch(updateTheme(data));
    } else {
      dispatch(createTheme(data));
    }
    onClose();
  };
  // if (!isOpen) return null;

  return (
    <div className="w-full bg-gray-50 h-100 border rounded-2xl -m-3 ">
      <div className=" flex justify-between p-5">
        <button
          type="submit"
          className="w-20 h-10 border btn-theme  cursor-pointer  rounded-xl"
          onClick={handelsave}
        >
          Save
        </button>
        <h3 className="camelcase head-col font-bold ">Theme-Setting</h3>
        <button
          className="w-20 h-10 border btn-theme  cursor-pointer  rounded-xl"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="modal-body relative">
        <div>
          <form className="max-w-2xl items-center justify-center grid grid-cols-3 md:grid-cols-4 gap-4 mx-auto">
            <div className="relative mb-5 col-span-2">
              <label>Theme Name</label>
              <input
                className="w-full   py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="name"
                type="text"
                placeholder="Theme name"
                required
                onChange={handelOnchange}
                value={formData.name}
              />
            </div>
            <div className="relative mb-5 col-span-2">
              <label>Theme Key</label>
              <input
                className="w-full col-span-2 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="key"
                type="text"
                placeholder="key of theme"
                required
                onChange={handelOnchange}
                value={formData.key}
              />
            </div>
            <div className="relative mb-5">
              <label>Button Type</label>
             <select 
        value={formData.typeButton}
        onChange={handelOnchange}
        name="typeButton"
        className="w-full col-span-2 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
      >
       
        <option value="fill"  className="bg-amber-50 hover:bg-gray-200 rounded-xl">Fill</option>
        <option value="stroke">Stroke</option>
      </select >

            </div>
            <div className="relative mb-5">
              <label>Button Background</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="bgBotton"
                type="color"
                required
                onChange={handelOnchange}
                value={formData.bgBotton}
                style={{ backgroundColor: `${formData.bgBotton}` }}
              />
            </div>

            <div className="relative mb-5">
              <label>Background Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="background"
                type="color"
                required
                onChange={handelOnchange}
                value={formData.background}
                style={{ backgroundColor: `${formData.background}` }}
              />
            </div>
            <div className="relative mb-5">
              <label>Text Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="text"
                type="color"
                required
                onChange={handelOnchange}
                value={formData.text}
                style={{ backgroundColor: `${formData.text}` }}
              />
            </div>
            <div className="relative mb-5">
              <label>Primary Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="primary"
                type="color"
                placeholder="Select color of primary"
                required
                onChange={handelOnchange}
                value={formData.primary}
                style={{ backgroundColor: `${formData.primary}` }}
              />
            </div>
            <div className="relative mb-5">
              <label>Sidebar Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="sidbarBg"
                type="color"
                placeholder="Select color of primary"
                required
                onChange={handelOnchange}
                value={formData.sidbarBg}
                style={{ backgroundColor: `${formData.sidbarBg}` }}
              />
            </div>
            <div className="relative mb-5">
              <label>Headding Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="headColor"
                type="color"
                required
                onChange={handelOnchange}
                value={formData.headColor}
                style={{ backgroundColor: `${formData.headColor}` }}
              />
            </div>

            <div className="relative mb-5">
              <label>Icon Color</label>
              <input
                className="w-full cursor-pointer h-10 py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="iconC"
                type="color"
                placeholder="Select color of primary"
                required
                onChange={handelOnchange}
                value={formData.iconC}
                style={{ backgroundColor: `${formData.iconC}` }}
              />
            </div>
          </form>
          <div
            style={{
              width: "120px",
              height: "80px",
              backgroundColor: formData.background,
              color: formData.text,
              border: `3px solid ${formData.primary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};
