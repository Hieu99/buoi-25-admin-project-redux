import { combineReducers } from "redux";
import userSlice from "./userSlice";

const createReducer = combineReducers({
  user: userSlice,
});

export default createReducer;
