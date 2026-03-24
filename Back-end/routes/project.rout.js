import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  createPtoject,
  DeleteProjectById,
  getProjectsByUserId,
  updateProjectByProjectId,
} from "../controller/project.controller.js";
import { createTaskInsideProject, deleteTaskByProjectIdAndTaskId, getAllTaskByUserId, getTasksByProjectId, updateTaskByProjectIdAndTaskId } from "../controller/task.controller.js";

const projectRout = express.Router();

projectRout.post("/create", userAuth, createPtoject);
projectRout.get("/get/:userId", userAuth, getProjectsByUserId);
projectRout.put("/update/:id", userAuth, updateProjectByProjectId);
projectRout.delete("/delete/:id", userAuth, DeleteProjectById);
projectRout.post("/create-task/:projectId",userAuth,createTaskInsideProject);
projectRout.get("/get-task/:projectId",userAuth,getTasksByProjectId);
projectRout.put("/update-task/:projectId/:taskId",userAuth,updateTaskByProjectIdAndTaskId);
projectRout.delete("/delete-task/:projectId/:taskId",userAuth,deleteTaskByProjectIdAndTaskId);
projectRout.get("/get-task-by/:userId",userAuth,getAllTaskByUserId)

export default projectRout;
