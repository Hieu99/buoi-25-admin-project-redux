import { createSlice } from "@reduxjs/toolkit";

export const AUTH_STATE = {
  auth: "AUTH",
  unauth: "UNAUTH",
};

const initialState = {
  auth: AUTH_STATE.unauth,
  profile: null,
};

const authSlice = createSlice({
  name: "authSlide",
  initialState,
  reducers: {
    setIsAuth(state, action) {
      state.profile = action.payload;
      state.auth = AUTH_STATE.auth;
    },
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
