import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";
import { AUTH_END_POINTS } from "../../Services/endPoints";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

/* 🔹 Register API */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.REGISTER, formData);
      return res.data; // response from server
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const LoginUser = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.LOGIN, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const sendOTPToLoginUser = createAsyncThunk(
  "sendotp",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.SEND_OTP, userId);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Please resend OTP"
      );
    }
  }
);

export const verifyOtpOfUser = createAsyncThunk(
  "verify-otp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.VERIFY_OTP, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid OTP");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "getAlluser/get",
  async(formData,{rejectWithValue})=>{
    try{
      const res = await api.get(AUTH_END_POINTS.GET_ALL_USERS);
      return res?.data

    }catch(err){
      rejectWithValue(err.response.data.message || "Getting all user are failed")
    }
  }
)

const registrationSlice = createSlice({
  name: "auth",
  initialState: {
    responseMessage: null,
    allUsers:[],
    loading: false,
    error: null,
    success: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isCompleteRegistaration: false,
    isSendVerificationotp: false,
    isLogin: false,
    isVerificationComplete: false,
    isUserPresentInLocalStorage:
      JSON.parse(localStorage.getItem("user")) || null,
  },

  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    // this is for registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        (state.isCompleteRegistaration = true),
          (state.responseMessage = action.payload.message);
        toast.success(action.payload.message);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
    // this is for login
    builder
      .addCase(LoginUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(LoginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.success = false),
          (state.error = action.payload);
        toast.error(action.payload);
      })

      .addCase(LoginUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.success = true),
          console.log(action.payload, "======Slice"),
          (state.user = action.payload.user),
          (state.token = action.payload.token);
        state.responseMessage = action.payload.message;
        state.isCompleteRegistaration = true;
        state.isLogin = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
        state.isVerificationComplete = action.payload.user.isVerifiredUser;

        state.isUserPresentInLocalStorage =
          JSON.parse(localStorage.getItem("user")) || null;
        toast.success(action.payload.message);
      });

    // send Otp

    builder
      .addCase(sendOTPToLoginUser.pending, (state) => {
        (state.loading = true), (state.error = null), (state.success = false);
      })
      .addCase(sendOTPToLoginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.success = false),
          (state.responseMessage = action.payload.message);
        toast.error(action.payload);
      })
      .addCase(sendOTPToLoginUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.success = true),
          (state.responseMessage = action.payload.message);
        state.isSendVerificationotp = true;
        toast.success(action.payload.message);
      });

    // verification otp
    builder
      .addCase(verifyOtpOfUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(verifyOtpOfUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.success = false);
        toast.error(action.payload);
      })
      .addCase(verifyOtpOfUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.success = true),
          (state.responseMessage = action.payload.message);
        state.isVerificationComplete = true;

        toast.success(action.payload.message);
      })
      .addCase(getAllUsers.pending,(state)=>{
        state.loading=true;
        state.error=null;
        state.success=false;
      })
      .addCase(getAllUsers.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload.message
        state.success =false;
      })
      .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.loading=false;
        state.success=true;
        console.log(action.payload.users,"-----authSlice------")
        state.allUsers=action.payload.users
      })
  },
});

export const { resetAuthState, logout } = registrationSlice.actions;

export default registrationSlice.reducer;
