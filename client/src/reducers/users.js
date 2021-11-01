import types from "../actions/types";
const initialState = {
  users: {},
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER_LOGIN:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
