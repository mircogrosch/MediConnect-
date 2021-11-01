import axios from "axios";
import types from "./types.js";
const URL = "http://localhost:3001";

export const getDoctors = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/doctor`);
    dispatch({ type: types.GET_DOCTORS, payload: response.data });
  };
};

export const getUser = (user) => {
  return async function (dispatch) {
    const response = await axios.post(`${URL}/login`, user);
    dispatch({ type: types.GET_USER_LOGIN, payload: response.data });
  };
};

export const postDoctor = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/doctor`, payload);
      return dispatch({
        type: types.POST_DOCTOR,
        payload: response.data,
      });
    } catch (error) {
      alert(error); // CORREGIR! ----> EN EL CASO DE QUE HAYA UN ERROR, EL MENSAJE A MOSTRAR TIENE QUE VENIR DEL BACK
    }
  };
};

export function getSpecialities() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL}/specialities`);
      return dispatch({
        type: types.GET_SPECIALITIES,
        payload: response.data,
      });
    } catch (error) {
      console.log("Actions - getSpecialities---> ", error);
    }
  };
}

export const postPatient = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post(`${URL}/patient`, payload);
      console.log(payload);
      alert("Se creo el paciente exitosamente");
      return dispatch({
        type: types.POST_PATIENT,
        payload,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const getHealthInsurances = () => {
  return async function (dispatch) {
    try {
      let healthInsurances = await axios.get(`${URL}/healthinsurance`);
      return dispatch({
        type: types.GET_HEALTHINSURANCES,
        payload: healthInsurances.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};
