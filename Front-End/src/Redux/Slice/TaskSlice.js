import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";
import { AUTH_END_POINTS } from "../../Services/endPoints";
import { toast } from "react-toastify";

export const createTaskOfProject = createAsyncThunk(
  "createt/task",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${AUTH_END_POINTS.CREATE_TASK_IN_PROJECT}${projectId}`,
        formData
      );
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Task add to failed ");
    }
  }
);

export const getAllTaskByUserId = createAsyncThunk(
  "get-task/user",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${AUTH_END_POINTS.GET_ALL_TASK_BY_USER_ID}${userId}`
      );
      return res.data;
    } catch (err) {
      rejectWithValue(err.response.data || "Get project failed !");
    }
  }
);

export const updateTaskByTaskId = createAsyncThunk(
  "update/task",
  async ({ projectId, taskId, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${AUTH_END_POINTS.UPDATE_TASK_BY_PROJECT_ID}${projectId}/${taskId}`,
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data || "failed to update task !");
    }
  }
);

export const deleteTaskByProjectIdAndTaskId = createAsyncThunk(
  "delete/task",
  async ({ projectId, taskId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(
        `${AUTH_END_POINTS.DELETE_TASK_BY_PROJECT_TASK_ID}${projectId}/${taskId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response.data || "Faild to detele selected task"
      );
    }
  }
);

const TaskSlice = createSlice({
  name: "task",
  initialState: {
    loading: false,
    error: null,
    success: false,
    tasks: [],
  },
  reducers: {
    ResetTaskInitial: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskOfProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createTaskOfProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.success = false;
        toast.error(action.payload.message);
      })
      .addCase(createTaskOfProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(action.payload.message);
        state.task = action.payload.tasks;
      })

      // get all task by user
      .addCase(getAllTaskByUserId.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllTaskByUserId.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(getAllTaskByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(action.payload.tasks);
        state.tasks = action.payload.tasks;
      })
      // update task
      .addCase(updateTaskByTaskId.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateTaskByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(updateTaskByTaskId.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success(action.payload.message);
      })
      .addCase(deleteTaskByProjectIdAndTaskId.pending,(state)=>{
        state.loading=true;
        state.success =false;
        state.error=false;
      })
      .addCase(deleteTaskByProjectIdAndTaskId.rejected,(state,action)=>{
        state.loading= false;
        state.error =action.payload.message;
        toast.error(action.payload.message);
        state.success=false;
      })
      .addCase(deleteTaskByProjectIdAndTaskId.fulfilled,(state,action)=>{
        state.loading =false;
        state.success=true;
        state.error=null;
        toast.success(action.payload.message)
      })
  },
});

export const { ResetTaskInitial } = TaskSlice.actions;
export default TaskSlice.reducer;
