import types from "../actions/types";
import swal from "sweetalert";
const initialState = {
  names: [],
  copyNames: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
  selectContact: null,
};
/*
 Este estado guarda todos los doctores asociados a un paciente
 */
export const myDoctors = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_DOCTORS:
      return {
        ...state,
        names: action.payload.data,
        copyNames: action.payload.data,
      };
    case types.GET_CONTACT:
      return {
        ...state,
        selectContact: state.names.find((e) => e.email === action.payload),
      };

    case types.FILTER_SPECIALITIES_MY_DOCTORS:
      let filtered;
      if (action.payload === "TODAS") {
        filtered = state.copyNames;
      } else {
        filtered = state.names.filter(
          (doc) => doc.specialities[0]?.id === action.payload
        );
      }
      return {
        ...state,
        names: filtered,
      };

    case types.FILTER_MY_DOCTORS_BY_NAME:
      if (action.payload.data.data.length) {
        return {
          ...state,
          names: action.payload.data.data,
        };
      } else {
        swal({
          title: `No tiene asociado un profesional con ese nombre`,
          icon: "info",
          button: "Continuar",
        });
        return {
          ...state,
          names: state.copyNames,
        };
      }

    case types.DELETE_DOCTOR:
      let response = state.names.filter(
        (doc) => doc.id !== action.payload.data.data.id
      );
      swal({
        title: `${action.payload.data.message}`,
        icon: "success",
        button: "Continuar",
      });
      return {
        ...state,
        names: response,
      };
    default:
      return state;
  }
};
