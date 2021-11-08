import types from "../actions/types";
const initialState = {
  names: [],
  copyNames: [], // Este estado sirve de soporte para que funcione bien el filtrado (siempre va a tener todos los doctores)
  selectContact: null
};
export const myPatients = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_PATIENTS:
      return {
        ...state,
        names: action.payload.data,
        copyNames: action.payload.data,
      };
    case types.GET_CONTACT:
      return({
        ...state,
        selectContact: state.names.find(e => e.email === action.payload)
      })
    default:
        return state;
    }
};

