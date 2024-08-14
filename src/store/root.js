import { combineReducers } from "redux";
import helmetSlice from "./app/helmetSlice";
import authSlice from "./app/authSlice";
import alertSlice from "./app/alertSlice";
import common from "./common";

const rootReducer = combineReducers({
  helmet: helmetSlice,
  auth: authSlice,
  alert: alertSlice,
  common,
});

export default rootReducer;
