import types from "../actions/types";

const initialState = {
  myPatients: [],
};

export const myPatients = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_PATIENTS:
      return {
        ...state,
        myPatients: action.payload.data,
      };
    case types.FILTER_MY_PATIENTS_BY_NAME:
      return {
        ...state,
        myPatients: action.payload.data,
      };
    default:
      return state;
  }
};
