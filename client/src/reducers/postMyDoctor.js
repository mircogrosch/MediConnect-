import types from "../actions/types";

export const postMyDoctor = (state = [], action) => {
  switch (action.type) {
    case types.POST_MY_DOCTOR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
