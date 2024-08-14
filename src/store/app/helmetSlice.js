import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "App",
};

const helmetSlice = createSlice({
  name: "helmetSlice",
  initialState,
  reducers: {
    setHelmetTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { setHelmetTitle } = helmetSlice.actions;

export default helmetSlice.reducer;
