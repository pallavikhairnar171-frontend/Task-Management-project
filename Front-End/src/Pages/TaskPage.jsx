import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskByProjectIdAndTaskId,
  getAllTaskByUserId,
  updateTaskByTaskId,
} from "../Redux/Slice/TaskSlice";
import { Button, IconButton } from "@mui/material";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { useDrag, useDrop } from "react-dnd";
import { DynamicDialogBox } from "../components/Models/dynamicDialogBox";
import { DynamicForm } from "../components/forms/DynamicForm";
import { TaskFormData } from "../Services/FieldsConfigration";
import { getAllUsers } from "../Redux/Slice/authSlice";

export const TaskPage = () => {
  const [Task, SetTask] = useState();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const getAPICall = async () => {
    const userId = user._id;
    await dispatch(getAllTaskByUserId(userId));
  };

  useEffect(() => {
    getAPICall();
  }, []);
  const statuses = ["todo", "in-progress", "done"];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {statuses.map((status, index) => (
            <Grid size={{ xs: 6, md: 4 }} key={index}>
              <Paper className="mb-2 text-center  font-bold text-gray-600">
                <SectionStatus status={status} />
              </Paper>
              {tasks?.map((task) =>
                task?.status === status ? (
                  <Card
                    task={task}
                    tasks={tasks}
                    key={task._id}
                    setTask={SetTask}
                  />
                ) : null
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export const Card = ({ task, tasks, setTask }) => {
  const [openEditDiForm, setOpenEditDiForm] = useState(false);
  const [openDeleteDilogConfirm, setOpenDeleteDilogConfirm] = useState(false);
  const [selectedTask,setSelectedTask] = useState(null)
  const {user} =useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.auth);
  const actionsForDelete = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpenDeleteDilogConfirm(false);
        close();
      },
    },
    {
      label: "Yes",
      variant: "contained",
      onClick: (close) => {
        console.log("Saved");
         handelDeleteProject(selectedTask);
        close();
      },
    },
  ];
  const actionsForEdit = [
    {
      label: "Cancel",
      onClick: (close) => {
        setOpenEditDiForm(false);
        close();
      },
    },
    
  ];
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {
      taskId: task?._id,
      projectId: task?.projectId,
      status: task?.status,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  console.log(isDragging);
  const [expanded, setExpanded] = useState(false);
  const handelDeleteProject = async(task) =>{
    const obj ={
      projectId:task.projectId,
      taskId:task._id
    }
   await dispatch(deleteTaskByProjectIdAndTaskId(obj));
   dispatch(getAllTaskByUserId(user._id))
  }
  const handleArrowClick = (e) => {
    e.stopPropagation(); //
    setExpanded((prev) => !prev);
  };

  const handelSubmitForm = async(formdata) => {
    const {projectId,_id,...formData} = formdata
    const taskId =_id
   await dispatch(updateTaskByTaskId({projectId,taskId,formData}))
    dispatch(getAllTaskByUserId(user._id))
    console.log(formData);
  };
  const handelOnClosed = (el) => {
    console.log(el);
  };
  useEffect(() => {
    if (openEditDiForm) {
      dispatch(getAllUsers());
      TaskFormData.forEach((task) => {
        if (task.name === "assignedTo") {
          allUsers.forEach((el) => {
            const obj = {
              label: el.label,
              value: el.value._id,
            };
            task.options.push(obj);
          });
        }
      });
    }
  }, [dispatch, openEditDiForm]);

  return (
    <>
      <div className="mb-2 " ref={drag}>
        <Accordion expanded={expanded}>
          <AccordionSummary
            component="div"
            className="task-summary"
            sx={{
              cursor: "all-scroll",
              "& *": {
                cursor: "all-scroll",
              },

              // but allow buttons to override
              "& button": {
                cursor: "pointer !important",
              },
            }}
            onClick={(e) => e.stopPropagation()} //  disable default expand
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontWeight={500}>{task?.title}</Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                {/* ARROW — ONLY THIS EXPANDS */}
                <IconButton
                  className="icon"
                  size="small"
                  onClick={handleArrowClick}
                  sx={{ cursor: "pointer" }}
                >
                  <ArrowDownwardIcon
                    sx={{
                      transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.2s",
                    }}
                  />
                </IconButton>

                {/* DELETE */}
                <IconButton
                  className="icon"
                  sx={{ cursor: "pointer" }}
                  size="small"
                  onClick={(e) => {
                    setOpenDeleteDilogConfirm(true)
                    setSelectedTask(task)
                    e.stopPropagation();
                    // handleDelete(task);
                  }}
                >
                  <FaTrashAlt />
                </IconButton>
                {openEditDiForm && (
                  <DynamicDialogBox
                    open={openEditDiForm}
                    actions={actionsForEdit}
                    onClose={(el) => handelOnClosed(el)}
                  >
                    <DynamicForm
                      onSubmit={(el) => handelSubmitForm(el)}
                      fields={TaskFormData}
                      initialValues={task}
                    />
                  </DynamicDialogBox>
                )}
                {openDeleteDilogConfirm && (
                  <DynamicDialogBox
                    open={openDeleteDilogConfirm}
                    actions={actionsForDelete}
                    onClose={(el) => handelOnClosed(el)}
                    height="100"
                    title={"Confirmation"}
                  >
                    <p>Do You want to delete this task ? please confirm that</p>
                  </DynamicDialogBox>
                )}

                {/* EDIT */}
                <IconButton
                  className="icon"
                  sx={{ cursor: "pointer" }}
                  size="small"
                  onClick={(e) => {
                    setOpenEditDiForm(true);
                    e.stopPropagation();
                    // handleEdit(task);
                  }}
                >
                  <FaPenAlt />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Typography color="text.secondary">{task?.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

const SectionStatus = ({ status }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const UpdateTask = async (task) => {
    try {
      const formData = {
        status: status,
      };

      if (task.status !== status) {
        if (task.status === "todo" && status === "done") return;
        if (task.status === "done" && status === "todo") return;
        else {
          await dispatch(updateTaskByTaskId({ ...task, formData }));
          dispatch(getAllTaskByUserId(user._id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (task) => UpdateTask(task),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop}>
      <h1>{status} List</h1>
    </div>
  );
};
