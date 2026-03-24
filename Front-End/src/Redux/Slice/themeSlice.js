import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../Services/api";
import { AUTH_END_POINTS } from "../../Services/endPoints";
import { toast } from "react-toastify";

export const createTheme = createAsyncThunk(
  "create",

  async (FormData, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.CREATE_THEME, FormData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to create theme"
      );
    }
  }
);

export const updateTheme = createAsyncThunk(
  "update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(AUTH_END_POINTS.UPDATE_THEME, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "failed to update theme"
      );
    }
  }
);
export const getThemeByUserId = createAsyncThunk(
  "getTheme",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${AUTH_END_POINTS.GET_THEME}${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Faitch Theme Of User is Faild "
      );
    }
  }
);

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    loading: false,
    success: false,
    theme: JSON.parse(localStorage.getItem("theme") || null),
    error: null,
  },

  reducers: {
    resetThemeState: (state) => {
      (state.loading = false), (state.error = null), (state.success = false);
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTheme.pending, (state) => {
        (state.loading = true), (state.success = false), (state.error = null);
      })
      .addCase(createTheme.rejected, (state, action) => {
        (state.loading = false),
          (state.success = false),
          (state.error = action.error);
        toast.error(action.payload);
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        (state.loading = false),
          (state.success = true),
          localStorage.setItem("theme", JSON.stringify(action.payload.theme)),
          (state.theme = action.payload.theme);
        toast.success(action.payload.message);

        document.documentElement.style.setProperty(
          "--bg",
          state.theme.background
        );
        document.documentElement.style.setProperty("--text", state.theme.text);
        document.documentElement.style.setProperty(
          "--primary",
          state.theme.primary
        );
      });
    // update theme
    builder
      .addCase(updateTheme.pending, (state) => {
        (state.loading = true), (state.success = false), (state.error = null);
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loading = false;
        (state.success = false), (state.error = action.payload);
        toast.error(action.payload);
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        localStorage.setItem("theme", JSON.stringify(action.payload.theme));
        state.theme = action.payload.theme;
        toast.success(action.payload.message);

        document.documentElement.style.setProperty(
          "--bg",
          state.theme.background
        );
        document.documentElement.style.setProperty("--text", state.theme.text);
        document.documentElement.style.setProperty(
          "--primary",
          state.theme.primary
        );
      })
      .addCase(getThemeByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getThemeByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.success = false;
        toast.error(action.payload);
      })
      .addCase(getThemeByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem("theme", JSON.stringify(action.payload.theme));
        state.theme = action.payload.theme;
        document.documentElement.style.setProperty(
          "--bg",
          state.theme.background
        );
        document.documentElement.style.setProperty("--text", state.theme.text);
        document.documentElement.style.setProperty(
          "--primary",
          state.theme.primary
        );
        toast.success(action.payload.message);
      });
  },
});
export const { resetThemeState } = ThemeSlice.actions;
export default ThemeSlice.reducer;
