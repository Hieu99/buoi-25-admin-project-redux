import { createAsyncThunk } from "@reduxjs/toolkit";
import { MESSAGE_STATUS, setAlertMessage } from "../app/alertSlice";
import UserRequester from "../../service/userRequester";
import { message } from "antd";

export const thunkFetchListUser = createAsyncThunk(
  "thunkFetchListUser",
  async (_, thunkApi) => {
    try {
      const res = await UserRequester.listUser(thunkApi.signal);

      if (res.status === 200) {
        if (thunkApi.signal.aborted) {
          console.log("api cancelled");
          return thunkApi.rejectWithValue("api cancelled");
        }
        thunkApi.dispatch(
          setAlertMessage({
            message: "get lsit user successfully",
            status: MESSAGE_STATUS.success,
          })
        );
        return thunkApi.fulfillWithValue(res.data);
      }
    } catch (err) {
      thunkApi.dispatch(
        setAlertMessage({
          message: err.response.data,
          status: MESSAGE_STATUS.error,
        })
      );
      thunkApi.rejectWithValue(err.response.message);
    }
  }
);

export const thunkFetchUserDetail = createAsyncThunk(
  "thunkFetchUserDetail",
  async (payload, thunkApi) => {
    try {
      const res = await UserRequester.userDetail(payload.id, thunkApi.signal);
      if (res.status === 200) {
        payload.setOpenModal(true);
        return thunkApi.fulfillWithValue(res.data);
      }
    } catch (err) {
      if (thunkApi.signal.aborted) {
        return thunkApi.rejectWithValue("signal aborted");
      }
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);
