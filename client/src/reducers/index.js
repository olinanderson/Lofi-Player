import { combineReducers } from "redux";
import alert from "./alert";
import audio from "./audio";

export default combineReducers({
  alert,
  audio,
});
