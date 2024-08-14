import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "N/A",
  status: "",
  logs: [],
};

const alertSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setAlertMessage(state, action) {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.logs = [
        ...state.logs,
        { message: action.payload.message, status: action.payload.status },
      ];
    },
  },
});

export const MESSAGE_STATUS = {
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
};

export const { setAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
