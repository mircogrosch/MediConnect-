import types from "../actions/types";
import swal from "sweetalert";

const initialState = {
  allDoctors: [],
  copyAllDoctors: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
};

export default function allDoctors(state = initialState, action) {
  switch (action.type) {
    case types.GET_DOCTORS:
      return {
        ...state,
        allDoctors: action.payload.data.unlinked,
        copyAllDoctors: action.payload.data.unlinked,
      };

    case types.FILTER_SPECIALITIES_ALL_DOCTORS:
      let filtered;
      if (action.payload === "TODAS") {
        filtered = state.copyAllDoctors;
      } else {
        filtered = state.allDoctors.filter(
          (doc) => doc.specialities[0]?.id === action.payload
        );
      }
      return {
        ...state,
        allDoctors: filtered,
      };

    case types.FILTER_DOCTORS_BY_NAME:
      if (action.payload.data.unlinked.length) {
        return {
          ...state,
          allDoctors: action.payload.data.unlinked,
        };
      } else {
        swal({
          title: `No existe ningún profesional con ese nombre`,
          icon: "info",
          button: "Continuar",
        });
        return {
          ...state,
          allDoctors: state.copyAllDoctors,
        };
      }

    default:
      return state;
  }
}
