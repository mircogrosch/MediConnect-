import { combineReducers } from "redux";
import formDocReducer from "./formDocReducer";
import allSpecialities from "./allSpecialities";
import { formPatient } from "./formPatient";
import { healthInsurances } from "./healthInsurances";
import notification from "./notification.js";
import users from "./users";
import allDoctors from "./allDoctors";
import { myDoctors } from "./myDoctors";
import { postMyDoctor } from "./postMyDoctor";
import {myPatients} from "./myPatients"

//import reducers here
export default combineReducers({
  //add reducers here
  formDocReducer,
  users,
  allSpecialities,
  formPatient,
  healthInsurances,
  notification,
  allDoctors,
  myDoctors,
  postMyDoctor,
  myPatients,
});
