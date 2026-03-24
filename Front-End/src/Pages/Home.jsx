import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaUserPlus,
  FaPencilAlt,
  FaTrashAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { FcLowPriority } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  deleteProjectById,
  getProjectsByUserId,
  updateProject,
} from "../Redux/Slice/projectSlice";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";
import { DynamicDialogBox } from "../components/Models/dynamicDialogBox";
import { DynamicForm } from "../components/forms/DynamicForm";
import { ProjectFormData } from "../Services/FieldsConfigration";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { project } = useSelector((state) => state.project);
  const [selectedProjectID, setSelectedProjectID] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [shouldClose, setShouldClose] = useState(false);

  const [openDeletePop, setOpenDeletePop] = useState(false);

  const initialFormState = {
    priority: currentProject?.priority ? currentProject?.priority : false,
    status: currentProject?.status ? currentProject?.status : "",
    name: currentProject?.name ? currentProject?.name : "",
    description: currentProject?.description ? currentProject?.description : "",
    startDate: currentProject?.startDate
      ? currentProject?.startDate
      : null,
    expexctedCompletDate: currentProject?.expexctedCompletDate
      ?currentProject?.expexctedCompletDate
      : null,
  };
  const actions = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpen(false);
        setOpenDeletePop(false);
        close(); // ✅ animated close
      },
    },
    // {
    //   label: "Yes",
    //   variant: "contained",
    //   onClick: async (close) => {
    //     console.log("Saved");
    //     await handelDeleteProject(selectedProjectID);
    //     close();
    //   },
    // },
  ];
   const actionsForDelete = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpenDeletePop(false);
        close(); // ✅ animated close
      },
    },
    {
      label: "Yes",
      variant: "contained",
      onClick: async (close) => {
        console.log("Saved");
        await handelDeleteProject(selectedProjectID);
        close();
      },
    },
  ];
  const handelDeleteProject = async (id) => {
    await dispatch(deleteProjectById(id));
    dispatch(getProjectsByUserId(user._id));
    setOpenDeletePop(false);
  };


  const handelFormSubmit = async (data, currentProject) => {
    if (currentProject?._id) {
      const payload = {
        ...data,
        userId: user._id,
      };
      const id = currentProject._id;
      const formData = payload;
      await dispatch(updateProject({ id, formData }));
       setOpen(false)
      await dispatch(getProjectsByUserId(user._id));
      // resetForm();
    } else {
      console.log(data, currentProject);
      const payload = {
        ...data,
        userId: user._id,
        
      };
      await dispatch(createProject(payload));
      await dispatch(getProjectsByUserId(user._id));
      setOpen(false)
      // resetForm();
    }
  };

  useEffect(() => {
    dispatch(getProjectsByUserId(user._id));
    
  }, []);

  return (
    <div className="m-0 card">
      <div className="grid grid-cols-4 gap-4 p-1">
        <div className="w-full  col-span-4   border-gray-400  shadow-xl ">
          <div className="flex justify-between p-2 border-b">
            <h2 className="head-col uppercase font-bold text-sm">
              ADD Project
            </h2>
            <Button
              className="btn-theme p-2 rounded-xl cursor-pointer"
              onClick={() => {
                setOpen(true), setCurrentProject(null);
              }}
            >
              <span className="">
                {!open ? <FaPlus /> : <MdOutlineClose size={20} />}
              </span>
            </Button>
          </div>

          <div className="h-100 p-4 overflow-y-scroll">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {project?.map((el) => (
                <Grid size={6} key={el._id}>
                  {open && (
                    <DynamicDialogBox
                      open={open}
                      actions={actions}
                      title={ currentProject?"Update Project Details" :"Create Project Details"}
                      onClose={() => {
                        setOpen(false);
                        setShouldClose(false);
                        //     handleDialogClose;
                      }}
                    >
                      <DynamicForm
                        initialValues={initialFormState}
                        fields={ProjectFormData}
                        onSubmit={(data, currentProject) =>
                          handelFormSubmit(data, currentProject)
                        }
                        project={currentProject}
                      />
                    </DynamicDialogBox>
                  )}
                  {openDeletePop ? (
                    <DynamicDialogBox
                      open={openDeletePop}
                      title="Confirm To Delete"
                      height="200"
                      actions={actionsForDelete}
                    >
                      <p>Do you want to delete this project please Confirm</p>
                    </DynamicDialogBox>
                  ) : null}

                  <Card
                    sx={{
                      width: "100%",
                      height: 200,
                    }}
                    variant="outlined"
                    className="card"
                  >
                    <CardContent>
                      <Typography
                        component="div"
                        className="flex justify-between font-bold"
                        sx={{
                          color: "text.secondary",
                          fontSize: 14,
                          fontStyle: "bold",
                        }}
                      >
                        {el.name}
                        {el.status == "inprogress" ? (
                          <Chip
                            label={el.status}
                            color="secondary"
                            variant="outlined"
                          />
                        ) : null}
                        {el.status == "pending" ? (
                          <Chip
                            label={el.status}
                            color="primary"
                            variant="outlined"
                          />
                        ) : null}{" "}
                        {el.status == "completed" ? (
                          <Chip
                            label={el.status}
                            color="success"
                            variant="outlined"
                          />
                        ) : null}
                      </Typography>
                      <Typography variant="outlined" component="div">
                        <span>{el.description}</span>
                      </Typography>
                      <Typography
                        component="div"
                        sx={{ color: "text.secondary", mb: 1.5 }}
                      ></Typography>
                      <Typography
                        component="div"
                        variant="body2"
                        className=" flex justify-between"
                      >
                        <div></div>
                        <span className="bg-gray-950 icon  w-55 p-1 rounded-xl  flex gap-2 justify-between">
                          <FaCalendarAlt />{" "}
                          {dayjs(el.startDate).format("DD-MM-YYYY")} To{" "}
                          {dayjs(el.expexctedCompletDate).format("DD-MM-YYYY")}
                        </span>
                      </Typography>
                    </CardContent>
                    <CardActions className="h-10 flex icon  gap-2 justify-between iconColor mx-4">
                      <div className="self-start">
                        <span>
                          <FcLowPriority />
                          <span className="text-gray-400">
                            {el.priority ? "Yes" : "No"}
                          </span>
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <IconButton className=" icon p-3 rounded-full cursor-pointer">
                          <FaUserPlus />
                        </IconButton>
                        <IconButton
                          className=" p-3 icon rounded-full cursor-pointer"
                          onClick={() => {
                            setOpenDeletePop(true);
                            setSelectedProjectID(el._id);
                            setCurrentProject(el);
                          }}
                        >
                          <FaTrashAlt />
                        </IconButton>
                        < IconButton
                          onClick={() => {
                            setOpen(true), setCurrentProject(el);
                          }}
                          className=" icon p-3 rounded-full cursor-pointer"
                        >
                          <FaPencilAlt />
                        </IconButton>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
        <div className="w-full col-span-2 bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
        <div className="w-full bg-theme border h-45"></div>
      </div>
    </div>
  );
};
