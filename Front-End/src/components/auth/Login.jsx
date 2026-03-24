import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, sendOTPToLoginUser } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select Status");
  const options = ["user", "admin", "manager", "client"];
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {
    loading,
    error,
    success,
    user,
    isLogin,
    isSendVerificationotp,
    isVerificationComplete,
    isUserPresentInLocalStorage,
  } = useSelector((state) => state.auth);
  console.log(success, error, user, loading);
  const onChangeSetForm = (el) => {
    const { name, value } = el.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handelFormSubmit = (el) => {
    el.preventDefault();
    console.log(formData, "to call api");
    const data = {
      email: formData.email,
      role: selected,
      password: formData.password,
    };
    dispatch(LoginUser(data));
    if (isVerificationComplete && isUserPresentInLocalStorage !== null) {
      navigation("/");
    }

    console.log(data);
  };

  const handelSendOtp = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    dispatch(sendOTPToLoginUser({ userId: user._id }));
  };

  useEffect(() => {
    if (isSendVerificationotp && !isVerificationComplete) {
      navigation("/otp-verify");
    }
    console.log(isVerificationComplete,"=======>")
    if(isVerificationComplete) {
      navigation("/");
    }
   
  }, [navigation,isSendVerificationotp, isVerificationComplete]);

  const gotToSignUp =()=>{
    navigation('/register')
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="login-container bg-[#e0e5ec] rounded-[25px] shadow-xl p-7 w-85 text-center">
          <div className="w-20 h-20 mt-0 mx-auto mb-6 bg-[#c4dbfa] rounded-full flext items-center  shadow-xl overflow-hidden">
            <img className="w-full h-full  " src="/Logo-Designing.jpg" alt="" />
          </div>

          {!isLogin ? (
            <form onSubmit={handelFormSubmit}>
              <div className="relative mb-5">
                <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                  &#128231;
                </i>
                <input
                  className="w-full py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                  name="email"
                  type="email"
                  placeholder="email"
                  value={formData.email}
                  required
                  onChange={onChangeSetForm}
                  autoComplete="username"
                />
              </div>
              <div className="relative mb-5">
                {selected === "user" ? (
                  <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                    &#128119;
                  </i>
                ) : null}

                {selected === "client" ? (
                  <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                    &#128115;
                  </i>
                ) : null}

                {selected === "manager" ? (
                  <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                    &#129333;
                  </i>
                ) : null}
                {selected === "admin" ? (
                  <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                    &#128373;
                  </i>
                ) : null}

                <button
                  onClick={() => setOpen(!open)}
                  className="flex py-3 px-12 w-full text-[#666] items-center justify-between rounded-lg border border-gray-300 bg-amber-50  text-sm"
                >
                  {selected}
                  <span>▼</span>
                </button>

                {open && (
                  <ul className="absolute z-10 mt-1 w-full items-center rounded-lg border bg-amber-50 shadow-lg">
                    {options.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          setSelected(item);
                          setOpen(false);
                        }}
                        className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative mb-5">
                <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                  &#128477;
                </i>
                <input
                  className="w-full py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formData.password}
                  required
                  onChange={onChangeSetForm}
                  autoComplete="new-password"
                />
              </div>

              <button
                className="bg-blue-950 shadow-xl text-white p-3 rounded-full w-full cursor-pointer my-3"
                type="submit"
              >
                Login
              </button>

              <div className="text-[0.85rem]">
                Forgot password?{" "}
                <a className=" text-[0.85rem] font-bold cursor-pointer" onClick={gotToSignUp}>
                  &#128073; Sign Up
                </a>
              </div>
            </form>
          ) : null}

          {isLogin && !isVerificationComplete ? (
            <button
              className="bg-blue-950 shadow-xl text-white p-3 rounded-full w-full cursor-pointer my-3"
              type="submit"
              onClick={handelSendOtp}
            >
              {" "}
              Send OTP{" "}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
