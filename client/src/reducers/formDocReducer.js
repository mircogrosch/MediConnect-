import types from "../actions/types";
const initialState = {
  allDoctors: [], // Este estado esta hecho solo para probar
};
export default function formDocReducer(state = initialState, action) {
  switch (action.type) {
    case types.POST_DOCTOR:
      return {
        ...state,
        allPeople: [...state.allDoctors, action.payload],
      };
    default:
      return state;
  }
}
