import types from "../actions/types";
const initialState = {
  allDoctors: [],
  copyAllDoctors: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
};
export default function allDoctors(state = initialState, action) {
  switch (action.type) {
    case types.GET_DOCTORS:
      return {
        ...state,
        allDoctors: action.payload.data,
        copyAllDoctors: action.payload.data,
      };

    case types.FILTER_SPECIALITIES:
      let filtered;
      if (action.payload === "TODAS") {
        filtered = state.copyAllDoctors;
      } else {
        filtered = state.allDoctors.filter(
          (doc) => doc.specialities[0].id === action.payload
        );
      }
      return {
        ...state,
        allDoctors: filtered,
      };
    default:
      return state;
  }
}
