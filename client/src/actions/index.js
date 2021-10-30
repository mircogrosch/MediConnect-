import axios from "axios";
import type from "./types.js";
const URL = "http://localhost:3001";

export const getUser = (user) => {
  return async function (dispatch) {
    const response = await axios.post(`${URL}/login`, user);
    dispatch({ type: type.GET_USER_LOGIN, payload: response.data });
  };
};

export const postDoctor = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/doctor`, payload);
      return dispatch({
        type: type.POST_DOCTOR,
        payload: response.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const postPatient = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post(`${URL}/patient`, payload);
      console.log(payload)
      alert('Se creo el paciente exitosamente')
      return dispatch({
        type: type.POST_PATIENT,
        payload,
      });
    } catch (error) {
      alert(error);
    }
  };
};
