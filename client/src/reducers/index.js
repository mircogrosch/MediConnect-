import { combineReducers } from "redux";
import formDocReducer from "./formDocReducer";
import allSpecialities from "./allSpecialities";
import users from "./users";

export default combineReducers({
  //add reducers here
  formDocReducer,
  users,
  allSpecialities,
});
