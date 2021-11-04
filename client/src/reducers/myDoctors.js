import types from "../actions/types";
import swal from "sweetalert";
// const initialState = {
//   names: [],
//   copyNames: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
// };
export const myDoctors = (state = [], action) => {
  switch (action.type) {
    case types.GET_MY_DOCTORS:
      return {
        ...state,
        names: action.payload,
        // copyNames: action.payload,
      };
    case types.FILTER_DOCTORS_BY_NAME:
      let filtered;
      if (action.payload.data.length) {
        filtered = action.payload;
      } else {
        swal({
          title: "El profesional no se encuentra asociado",
          icon: "info",
          button: "Ok",
        });
        filtered = state.names;
      }
      return {
        ...state,
        names: filtered,
      };
    default:
      return state;
  }
};
