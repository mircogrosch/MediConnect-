
import { combineReducers } from "redux";
import formDocReducer from "./formDocReducer";
import {formPatient} from './formPatient'
import { healthInsurances } from "./healthInsurances";
import notification from './notification.js'

import users from "./users";

//import reducers here
export default combineReducers({
  //add reducers here
  formDocReducer,
  users,
  formPatient,
  healthInsurances,
  notification
});
