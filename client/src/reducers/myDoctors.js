import types from "../actions/types";
import swal from "sweetalert";
const initialState = {
  names: [],
  copyNames: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
};
export const myDoctors = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_DOCTORS:
      console.log(
        "estoy en el reducer my DOctors action.payload",
        action.payload.data
      );
      return {
        ...state,
        names: action.payload.data,
        copyNames: action.payload.data,
      };

    case types.FILTER_SPECIALITIES:
      let filtered;
      if (action.payload === "TODAS") {
        filtered = state.copyNames;
      } else {
        filtered = state.names.filter(
          (doc) => doc.specialities[0].id === action.payload
        );
      }
      return {
        ...state,
        names: filtered,
      };

    case types.FILTER_MY_DOCTORS_BY_NAME:
      console.log(
        "reducer filterdoctorsname action.payload.data.data",
        action.payload.data.data
      );
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
      console.log("reducer delete doctor", action.payload.data.data.id);
      let response = state.names.filter(
        (doc) => doc.id !== action.payload.data.data.id
      );
      alert(action.payload.data.message);
      return {
        ...state,
        names: response,
      };
    default:
      return state;
  }
};
