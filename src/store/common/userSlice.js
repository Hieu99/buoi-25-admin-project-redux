import { createSlice } from "@reduxjs/toolkit";
import {
  thunkFetchListUser,
  thunkFetchUserDetail,
} from "../asyncThunk/userThunk";

const initialState = {
  listUser: [],
  loading: false,
  userDetail: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserPageLoading(state, action) {
      state.loading = action.payload;
    },
    setUserDetail(state, action) {
      state.userDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchListUser.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(thunkFetchListUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
      state.loading = false;
    });
    builder.addCase(thunkFetchListUser.rejected, (state, _) => {
      state.loading = false;
    });

    //user detail
    builder.addCase(thunkFetchUserDetail.fulfilled, (state, action) => {
      state.userDetail = action.payload;
    });
  },
});

export const { setUserPageLoading, setUserDetail } = userSlice.actions;

export default userSlice.reducer;
