import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Services/api";
import { AUTH_END_POINTS } from "../../Services/endPoints";
import { toast } from "react-toastify";


export const createNotification = createAsyncThunk(
    "/sendNotification",
    async(formData,{rejectWithValue})=>{
        try{
            const res = await api.post(AUTH_END_POINTS.UPDATE_NOTIFICATION,formData);
            return res?.data
        }catch(err){
            return rejectWithValue(err.response?.data?.message || "Faild to save notification")
        }
    }
);

const notificatSlice = createSlice({
    name:"notify",
    initialState:{
        loading:false,
        success:false,
        error:null,
        notification:[]
    },
    reducers:{
        ResetNotification:(state)=>{
            state.loading=false;
            state.error = null;
            state.success =false;
            state.notification = [];
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createNotification.pending,(state)=>{
            state.loading =true;
            state.success =false;

        })
        .addCase(createNotification.rejected,(state,action)=>{
            state.loading =false;
            state.success =false;
            state.error = action.error
        })
        .addCase(createNotification.fulfilled,(state,action)=>{
            state.loading =false;
            state.success =true;
            toast.success(action.payload.message)
        })
    }
    
})


export const {ResetNotification} = notificatSlice.actions;
export default notificatSlice.reducer;