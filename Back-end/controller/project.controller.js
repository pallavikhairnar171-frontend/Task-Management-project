import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

const createPtoject = async (req, res) => {
  const { name, description, startDate, userId, ...data } = req.body;
  if (!name || !description || !startDate || !userId)
    return res.status(400).json({
      success: false,
      message: `Please provide project require details`,
    });
  try {
    const project = await projectModel.create({
      name,
      description,
      startDate,
      userId,
      ...data,
      members: [userId],
      
    });
    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      project: project,
    });
  } catch (err) {console.log(err)
    return res.status(500).json({ success: false, message: err.message });
  }
};
const getProjectsByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId)
    return res
      .status(400)
      .json({ success: false, message: "Please provide userId" });

  try {
    
    const projects = await projectModel.find({ userId });
    return res
      .status(200)
      .json({ success: true, message: "Project faitch successfull", projects });
    console.log(projects);
  } catch (err) {
    
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateProjectByProjectId = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project id",
      });
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        expexctedCompletDate: req.body.expexctedCompletDate
          ? new Date(req.body.expexctedCompletDate)
          : null,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const DeleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project id is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project id",
      });
    }
    const project = await projectModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export {
  createPtoject,
  getProjectsByUserId,
  updateProjectByProjectId,
  DeleteProjectById,
};
