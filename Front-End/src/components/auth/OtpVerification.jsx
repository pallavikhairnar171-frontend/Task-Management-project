import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpOfUser } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const { user, isVerificationComplete } = useSelector((state) => state.auth);
  const handelFormSubmit = (el) => {
    el.preventDefault();
    console.log(otp, "to call api");
    const data = {
      otp: otp,
      userId: user._id,
    };
    dispatch(verifyOtpOfUser(data));
  };

  useEffect(() => {
    if (isVerificationComplete) {
      navigate("/");
    }
  }, [navigate,isVerificationComplete]);
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="login-container bg-[#e0e5ec] rounded-[25px] shadow-xl p-7 w-85 text-center">
          <div className="w-20 h-20 mt-0 mx-auto mb-6 bg-[#c4dbfa] rounded-full flext items-center  shadow-xl overflow-hidden">
            <img className="w-full h-full  " src="/Logo-Designing.jpg" alt="" />
          </div>
          <form onSubmit={handelFormSubmit}>
            <div className="relative mb-5 w-full flex justify-center">
              <i className="absolute -left-4 top-[50%]  transform-[translateY(-50%)]  text-[#666]">
                &#128231;
              </i>
              <OtpInput
                inputStyle={{ width: "1.8em" }}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2 "></span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-2em h-12 text-center text-lg border  
                 border-gray-300 focus:border-indigo-500 
                 focus:ring-3 focus:ring-indigo-200 rounded-xl"
                  />
                )}
              />
            </div>

            <Button
              className="bg-blue-950 shadow-xl text-white p-3 rounded-full w-full cursor-pointer my-3"
              type="submit"
            >
              Verify OTP
            </Button>

            <div className="text-[0.85rem] ">
              <span className="text-red-500"> Time </span>
              <a className=" text-[0.85rem] font-bold cursor-pointer">
                &#128073; Resend OTP
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
