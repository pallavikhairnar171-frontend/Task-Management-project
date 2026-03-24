import express from "express";
import { getAllUsers, login, logout, register, sendVerificationCode, verifyOtp } from "../controller/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerificationCode);
authRouter.post('/verify-account-using-otp',userAuth,verifyOtp);
authRouter.get('/getAllUser',userAuth,getAllUsers)


export default authRouter;