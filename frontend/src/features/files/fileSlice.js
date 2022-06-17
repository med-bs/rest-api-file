import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fileService from "./fileService";

const initialState = {
  files: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new file
export const createFile = createAsyncThunk(
  "files/create",
  async (fileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.createFile(fileData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user files
export const getFiles = createAsyncThunk(
  "files/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.getFiles(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user file
export const updateFile = createAsyncThunk(
  "files/update",
  async (fileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const text = fileData.text;
      const data = { text };
      return await fileService.updateFile(fileData.id, data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user file
export const deleteFile = createAsyncThunk(
  "files/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await fileService.deleteFile(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files.push(action.payload);
      })
      .addCase(createFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = action.payload;
      })
      .addCase(getFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = state.files.map((file) =>
          file._id === action.payload._id ? action.payload : file
        );
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = state.files.filter(
          (file) => file._id !== action.payload._id
        );
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fileSlice.actions;
export default fileSlice.reducer;
