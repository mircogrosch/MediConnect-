import types from "../actions/types";

export const postOrder = (state = {}, action) => {
  switch (action.type) {
    case types.POST_ORDER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
