import { combineReducers } from "redux";
import formDocReducer from "./formDocReducer";
import users from "./users";
//import reducers here
// const initialState = {};
export default combineReducers({
  //add reducers here
  formDocReducer,
  users,
});
