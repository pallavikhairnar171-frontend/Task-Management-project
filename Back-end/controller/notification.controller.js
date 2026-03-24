import mongoose from "mongoose";
import notificationModel from "../models/notification.model.js";

const CreateNotification = async(req,res)=>{
    const {noti,msg,projectId,userId }=req.body
    try{
        if(!noti || !msg ||!projectId || !userId) res.status(400).json({success:false,message:"Please provide all details"})
        const notify = await notificationModel.create({noti,msg,projectId,userId})
        console.log(notify)
    }catch(err){
        res.status(500).json({success:false,message:err})
    }
}

export {CreateNotification}