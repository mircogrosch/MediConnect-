import types from "../actions/types";
const initialState = {
  allDoctors: [],
};
export default function allDoctors(state = initialState, action) {
  switch (action.type) {
    case types.GET_DOCTORS:
      return {
        ...state,
        allDoctors: [...action.payload.data],
      };
    default:
      return state;
  }
}
