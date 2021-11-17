import types from "../actions/types";

export const postPrescription = (state = {}, action) => {
  switch (action.type) {
    case types.POST_PRESCRIPTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};
