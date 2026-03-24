import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

const createTaskInsideProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, assignedTo, createdBy } = req.body;
  try {
    if (!projectId)
      return req
        .status(400)
        .json({ success: false, message: "Please provide project Id" });

    const project = await projectModel.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found !" });

    const newTask = {
      title,
      description,
      assignedTo,
      createdBy,
    };
    project.tasks.push(newTask);
    await project.save();

    return res.status(201).json({
      success: true,
      message: "Task added in project successfully",
      tasks: project.tasks,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getTasksByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    if (!projectId)
      return res
        .status(400)
        .json({ success: false, message: "Please provide project id !" });
    const project = await projectModel.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found !" });
    return res.status(200).json({
      success: true,
      message: "Tasks Faitch successfully !",
      tasks: project.tasks,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateTaskByProjectIdAndTaskId = async (req, res) => {
  const { projectId, taskId } = req.params;
  try {
    if (!projectId || !taskId)
      return res.status(400).json({
        success: false,
        message: "Please Provide projcet Id or Task Id",
      });
    const project = await projectModel.findById(projectId);
    if (!project)
      res.status(404).json({ success: false, message: "Project not found !" });
    const task = project.tasks.id(taskId);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    Object.assign(task, req.body);
    await project.save();
    return res
      .status(200)
      .json({ success: true, message: "Task updated successfully !" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteTaskByProjectIdAndTaskId = async (req, res) => {
  const { projectId, taskId } = req.params;
  try {
    if (!projectId || !taskId)
      return res.status(400).json({
        success: false,
        message: "Please provide project Id and taskId",
      });
    const project = await projectModel.findById(projectId);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found !" });
    const task = project.tasks.id(taskId);
    if (!task)
      return res
        .statu(404)
        .json({ success: false, message: "Task not found !" });

    project.tasks = project.tasks.filter(
      (task) => task._id.toString() !== taskId
    );
    await project.save();
    return res
      .status(200)
      .json({ success: false, message: "Task deleted successfully " });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getAllTaskByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user Id !" });

    const Tasks = await projectModel.aggregate([
      {
        $unwind: "$tasks",
      },
      {
        $match:{
          "tasks.assignedTo": new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project: {
          _id: "$tasks._id",
          title: "$tasks.title",
          description: "$tasks.description",
          status: "$tasks.status",
          priority: "$tasks.priority",
          createdBy: "$tasks.createdBy",
          assignedTo: "$tasks.assignedTo",
          projectId: "$_id",
          projectName: "$name",
          createdAt: "$tasks.createdAt",
        },
      },
    ]);
    console.log(Tasks,"======>")
     res.status(200).json({
      success: true,
      tasks: Tasks,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({success:false,message:err.message})
  }
};

export {
  deleteTaskByProjectIdAndTaskId,
  updateTaskByProjectIdAndTaskId,
  createTaskInsideProject,
  getTasksByProjectId,
  getAllTaskByUserId,
};
