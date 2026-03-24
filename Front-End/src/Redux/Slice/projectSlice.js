import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";
import { AUTH_END_POINTS } from "../../Services/endPoints";
import { toast } from "react-toastify";

export const createProject = createAsyncThunk(
  "createproject/",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.CREATE_PROJECT, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Project Added is failed"
      );
    }
  }
);
export const getProjectsByUserId = createAsyncThunk(
  "get/byId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${AUTH_END_POINTS.GET_ALL_PROJECT_BY_USER}${userId}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Faitch Project API getting rejected"
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${AUTH_END_POINTS.UPDATE_PROJECT_BY_ID}${id}`,
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Update Project API getting rejected"
      );
    }
  }
);

export const deleteProjectById =createAsyncThunk(
  "delete/Project",
  async(id,{rejectWithValue})=>{
    try{
      const res = await api.delete(`${AUTH_END_POINTS.DELETE_PROJECT_BY_ID}${id}`);
      return res.data
    }catch(err){
      return rejectWithValue(err?.response?.data?.message || "Failed to delete project")
    }
  }
)

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    success: false,
    error: null,
    project: [],
    createdProject:null,
    updatedProject: null,
  },

  reducers: {
    resetProjectReducer: (state) => {
      (state.error = null), (state.loading = false), (state.success = false);
    },
  },

  extraReducers: (builder) => {
    // create
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProject.rejected, (state, action) => {
        (state.loading = false),
          (state.success = false),
          (state.error = action.payload);
        toast.error(action.payload);
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.createdProject =action.payload.project
        toast.success(action.payload.message)
      })
      // get
      .addCase(getProjectsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProjectsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.success = false;
        toast.error(action.payload);
      })
      .addCase(getProjectsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.project = action.payload.projects;
        if(action.payload.message === "jwt expired"){
          localStorage.removeItem('token')
        }
         toast.success(action.payload.message)
      })
      // update
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error;
        toast.error(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.updatedProject = action.payload.data;
         toast.success(action.payload.message)
      })
      // delete
      .addCase(deleteProjectById.pending,(state)=>{
        state.loading =true;
        state.error =null;
        state.success = false
      })
      .addCase(deleteProjectById.rejected,(state,action)=>{
        state.loading = false;
        state.error =action.payload.message;
        state.success = false
      })
      .addCase(deleteProjectById.fulfilled,(state,action)=>{
        state.loading =false;
        state.success =true;
        state.error=null;
        toast.success(action.payload.message)
      })
  },
});

export const { resetProjectReducer } = projectSlice.actions;
export default projectSlice.reducer;
