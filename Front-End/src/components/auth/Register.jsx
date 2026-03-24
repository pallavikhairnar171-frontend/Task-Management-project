import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Slice/authSlice";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [selected, setSelected] = useState("Select Status");
  const user =useSelector((state) => state.auth) ||
    JSON.parse(localStorage.getItem("user"));
  const { isCompleteRegistaration, isUserPresentInLocalStorage } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });
  const options = ["user", "admin", "manager", "client"];

  const onChangeSetForm = (el) => {
    const { name, value } = el.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
    if(!/[!@#$%^&*()?><+]/.test(formData.password)) {
      setError("Password must be contain at list one special chararacter");
      return
    }
    if(!/[A-Z]/.test(formData.password)){
      setError("Password must contain at list one upper letter ");
      return
    }
    
  };
  const isMatch =
    formData.password &&
    formData.confirmpass &&
    formData.password !== formData.confirmpass;
  
  const handelFormSubmit = (el) => {
    el.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: selected,
    };
    dispatch(registerUser(data));
  };
  useEffect(() => {
    if (isCompleteRegistaration && isUserPresentInLocalStorage === null) {
      // navigate("/login"); // 👈 your login route
    } else {
      navigate("/register");
    }
  }, [isCompleteRegistaration, navigate, isUserPresentInLocalStorage]);

  const goToLogin=()=>{
    navigate("/login")
  }

  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <div className="login-container bg-[#e0e5ec] rounded-[25px] shadow-xl p-7 w-85 text-center">
          <div className="w-20 h-20 mt-0 mx-auto mb-6 bg-[#c4dbfa] rounded-full flext items-center  shadow-xl overflow-hidden">
            <img className="w-full h-full  " src="/Logo-Designing.jpg" alt="" />
          </div>
          <form onSubmit={handelFormSubmit}>
            <div className="relative mb-5">
              <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                &#129333;
              </i>
              <input
                className="w-full py-3 px-12 border-none bg-amber-50 rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="name"
                type="text"
                placeholder="name"
                required
                value={formData.name}
                onChange={onChangeSetForm}
                autoComplete="username"
              />
            </div>
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
            <div className="relative mb-5">
              <i className="absolute left-3.75 top-[50%] transform-[translateY(-50%)]  text-[#666]">
                &#128477;
              </i>
              <input
                className="w-full py-3 px-12 border-none bg-amber-50  rounded-[15px] shadow-xl text-[0.95rem] text-[#333] outline-none"
                name="confirmpass"
                type="password"
                placeholder="confirm password"
                value={formData.confirmpass}
                required
                onChange={onChangeSetForm}
                autoComplete="new-password"
              />
            </div>
            {isMatch && (
              <div className="text-red-500 text-sm mb-2 ">
               Password and Confirm password must be same
              </div>
            )}
            {
              error &&(
                <div className="text-red-500 text-sm mb-2 ">
                  {error}
                </div>
              )
            }
            <button
              className="bg-blue-950 shadow-xl text-white p-3 rounded-full w-full cursor-pointer my-3"
              type="submit"
              disabled={formData.password !== formData.confirmpass}
            >
              Submit
            </button>

            <div className="text-[0.85rem]">
              Forgot password?{" "}
              <a className=" text-[0.85rem] font-bold cursor-pointer" onClick={goToLogin}>
                &#128073; Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
