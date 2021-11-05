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
        allDoctors: action.payload.data.unlinked,
        copyAllDoctors: action.payload.data.unlinked,
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
    case types.FILTER_DOCTORS_BY_NAME:
      // // let filtered;
      // if (action.payload.data.length) {
      //   filtered = action.payload;
      // } else {
      //   swal({
      //     title: "El profesional no se encuentra asociado",
      //     icon: "info",
      //     button: "Ok",
      //   });
      //   filtered = state.names;
      // }
      console.log("estoy en el reducer filter name", action.payload);
      return {
        ...state,
        allDoctors: action.payload.data.unlinked,
      };
    default:
      return state;
  }
}
