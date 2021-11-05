import types from "../actions/types";

export default function users(state = {}, action) {
  switch (action.type) {
    case types.GET_USER_LOGIN:
      return {
        ...state,
        state: action.payload,
      };

    default:
      return state;
  }
}
