import React, { useEffect, useState } from "react";
import { DynamicTable } from "../components/Table/DynamicTable";
import { useDispatch, useSelector } from "react-redux";
import { DynamicDialogBox } from "../components/Models/dynamicDialogBox";
import { Chip } from "@mui/material";
import { DynamicForm } from "../components/forms/DynamicForm";
import { TaskFormData } from "../Services/FieldsConfigration";
import { getAllUsers } from "../Redux/Slice/authSlice";
import { createTaskOfProject } from "../Redux/Slice/TaskSlice";
import { deleteProjectById, getProjectsByUserId } from "../Redux/Slice/projectSlice";

export const Project = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDeleteConfirm, setOpenDeleteConfim ] =useState(false)
  const [openEditDialod, setOpenEditDialog] = useState(false);
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const { allUsers, user } = useSelector((state) => state.auth);

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenEditDialog(true);
  };

  const handelFormSubmit = (el) => {
    dispatch(
      createTaskOfProject({
        projectId: selectedProject._id,
        formData: { ...el, createdBy: user._id },
      })
    );
  };

  const handelOnClose = () => {};
  const handelTaskOpen = (row) => {
    setSelectedProject(row);
    setOpenEditDialog(true);
  };
  const actionsForDelete = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpenEditDialog(false);
        close();
      },
    },
    {
      label: "Yes",
      variant: "contained",
      onClick: async (close) => {
        console.log("Saved");
        await handelDeleteProject(selectedProject._id);
        close();
      },
    },
  ];

  const handelDeleteProject = async(projectId)=>{
    await dispatch(deleteProjectById(projectId));
    dispatch(getProjectsByUserId(user._id))
    setOpenDeleteConfim(false)
  }

  const handleDeleteTask = (task) => {
    setOpenDeleteConfim(true);
    setSelectedProject(task)
   
  };
  const projectColumn = [
    {
      field: "name",
      headerName: "Task Name",
    },
    {
      field: "description",
      headerName: "Description",
    },
    {
      field: "startDate",
      headerName: "Startt From",
    },

    {
      field: "status",
      headerName: "Status",
      render: (row) => (
        <Chip
          label={row.status}
          color={
            row.status === "completed"
              ? "success"
              : row.status === "inprogress"
              ? "warning"
              : "default"
          }
        />
      ),
    },
    // {
    //   field: "userId",
    //   headerName: "Created By",
    //   render: (row) => row.createdBy?.name,
    // },
    // {
    //   field: "assignedTo",
    //   headerName: "Assigned To",
    //   render: (row) => row.assignedTo?.name || "Unassigned",
    // },
  ];

  const initialValues = {
    title: "",
    priority: "",
    status: "",
    description: "",
    assignedTo: "",
  };

  useEffect(() => {
    dispatch(getProjectsByUserId(user._id));
    dispatch(getAllUsers());
    TaskFormData.forEach((el) => {
      if (el.name === "assignedTo") {
        el.options = allUsers;
      }
    });
  }, []);

  return (
    <div>
      <DynamicTable
        columns={projectColumn}
        rows={project}
        onEdit={handleEditTask}
        onDelete={(row)=>handleDeleteTask(row)}
        onTaskAdd={(row) => handelTaskOpen(row)}
      />
      {/* <DynamicDialogBox
      open={openEditDialod}
      
      /> */}
      <DynamicDialogBox
        open={openEditDialod}
        onClose={() => handelOnClose}
        actions={actionsForDelete}
        title={"Create Task Details"}
      >
        <DynamicForm
          fields={TaskFormData}
          initialValues={initialValues}
          onSubmit={(el) => handelFormSubmit(el)}
        />
      </DynamicDialogBox>
      <DynamicDialogBox open={openDeleteConfirm} height="100" actions={actionsForDelete} title={"Confirm Box"}>
        <p>Do you want to delete this project? please confirm that</p>
      </DynamicDialogBox>
    </div>
  );
};
