import React, {  useState } from "react";
import { Button } from "@mui/material";
import { InputText, SelectInput } from "./InputText";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getProjectsByUserId, updateProject } from "../../Redux/Slice/projectSlice";
import { DynamicDialogBox } from "../Models/dynamicDialogBox";
import dayjs from "dayjs";

export const AddProject = ({  open, onClose,data }) => {
  
  const initialFormState = {
    priority: data?.priority?data?.priority: false ,
    status: data?.status?data?.status: "",
    name: data?.name?data?.name: "",
    description: data?.description?data?.description: "",
    startDate:data?.startDate?dayjs(data?.startDate): null,
    expexctedCompletDate:data?.expexctedCompletDate?dayjs(data?.expexctedCompletDate): null,
  };

  console.log(initialFormState,"initialFormState")
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialFormState);
  const resetForm = () => {
    setForm(initialFormState);
  };
  const actions = [
  {
    label: "Cancel",
    onClick: (close) => {
      console.log("cancel button call")
      close(); // ✅ animated close
    },
  },
  {
    label: "Save",
    variant: "contained",
    onClick:async (close) => {
      console.log("Saved");
      await  handelSubmitProjectData(); 
        close();
    },
  },
];


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };
  const handleDateChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value, // dayjs | null
    }));
  };

  const handelSubmitProjectData =async () => {
    
    if(data._id){
       const payload = {
      ...form,
      startDate: form.startDate?.toISOString(),
      expexctedCompletDate: form.expexctedCompletDate?.toISOString(),
      userId: user._id,
    };
    const id= data._id
    const formData = payload
   await dispatch(updateProject({id,formData}))

  await dispatch(getProjectsByUserId(user._id));
      resetForm();

    }else{
      const payload = {
        ...form,
        startDate: form.startDate?.toISOString(),
        expexctedCompletDate: form.expexctedCompletDate?.toISOString(),
        userId: user._id,
      };
     await dispatch(createProject(payload));
     await dispatch(getProjectsByUserId(user._id));
      resetForm();

    }
  };





  return (
    <DynamicDialogBox
      open={open}
      onClose={onClose}
      title="Add Project"
      actions={actions}
    >
      <div  className="w-full items-center flex justify-center">
        <form className="w-100 p-5 ">
          <Box display="flex" flexDirection="column" gap={2}>
            <InputText
              label={"Project Name"}
              name="name"
              id="projectName"
              onChange={handleChange}
              value={form.name}
            />
            <InputText
              label="Project Description"
              multiline
              rows={4}
              variant="outlined"
              id="projectDiscription"
              fullWidth
              name="description"
              value={form.description}
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={form.startDate}
                onChange={(newValue) => handleDateChange("startDate", newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    name: "startDate",
                    id: "projectStartTime",
                  },
                }}
              />
              <DatePicker
                label="Expected project completion date"
                value={form.expexctedCompletDate}
                onChange={(newValue) =>
                  handleDateChange("expexctedCompletDate", newValue)
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: "normal",
                    name: "expexctedCompletDate",
                    id: "projectEndDate",
                  },
                }}
              />
            </LocalizationProvider>

            <SelectInput
              label="Status"
              name="status"
              value={form.status}
              id="projectStatus"
              onChange={handleChange}
              options={[
                { label: "Completed", value: "completed" },
                { label: "Inprogress", value: "inprogress" },
                { label: "Pending", value: "pending" },
              ]}
            />
            <SelectInput
              label="Preority"
              name="priority"
              id="projectPriority"
              value={form.priority}
              onChange={handleChange}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Box>

          {/* <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handelSubmitProjectData}
          >
            save
          </Button> */}
        </form>
      </div>
    </DynamicDialogBox>
  );
};
