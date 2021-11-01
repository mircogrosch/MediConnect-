import types from "../actions/types";
const initialState = {
  allSpecialities: [],
};
export default function allSpecialities(state = initialState, action) {
  switch (action.type) {
    case types.GET_SPECIALITIES:
      return {
        ...state,
        allSpecialities: [...action.payload.data],
      };
    default:
      return state;
  }
}
