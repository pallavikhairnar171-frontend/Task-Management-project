import express from "express";
import userAuth from "../middleware/userAuth.js";
import {CreateNotification} from "../controller/notification.controller.js"

const notificationRout = express.Router();

notificationRout.post('/notify',userAuth,CreateNotification);


export default notificationRout