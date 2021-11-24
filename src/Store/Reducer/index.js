import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  Data: AppReducer,
  User: UserReducer,
});
