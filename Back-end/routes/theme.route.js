
import express from "express";
import { createTheme, getProject, updateTheme } from "../controller/theme.controller.js";
import userAuth from "../middleware/userAuth.js";

const themeRout =express.Router();

themeRout.post('/create',userAuth, createTheme);
themeRout.post('/update',userAuth,updateTheme);
themeRout.get('/get/:userId',userAuth,getProject);

export default themeRout;