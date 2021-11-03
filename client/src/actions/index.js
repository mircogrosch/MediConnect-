import axios from "axios";
import types from "./types.js";
import swal from "sweetalert";
const URL = "http://localhost:3001";

export const getDoctors = () => {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/doctor`);
    dispatch({ type: types.GET_DOCTORS, payload: response.data });
  };
};

export const getUser = (user) => {
  return async function (dispatch) {
    const response = await axios.post(`${URL}/login`, user, {
      withCredentials: true,
    });
    dispatch({ type: types.GET_USER_LOGIN, payload: response.data });
  };
};

export const postDoctor = (payload, history) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL}/doctor`, payload);
      swal({
        title: `El registro fue exitoso`,
        icon: "success",
        button: "Continuar",
      }).then(() => history.push("/login"));
      return dispatch({
        type: types.POST_DOCTOR,
        payload: response.data,
      });
    } catch (error) {
      swal({
        title: "No se puedo registrar el usuario",
        dangerMode: true,
        icon: "error",
        button: "Reintentar",
      }).then(() => history.push("/register/doctor"));
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

export const getMyDoctors = (payload) => {
  return async function (dispatch) {
    try {
      let myDocs = await axios.get(`${URL}/patient/doctors/${payload}`);
      return dispatch({
        type: types.GET_MY_DOCTORS,
        payload: myDocs.data,
      });
    } catch (error) {
      alert(error);
    }
  };
};

export const postMyDoctor = (payload, id_Doctor) => {
  return async function (dispatch) {
    try {
      console.log("POST_MY_DOCTOR ACTIONNNNNNN", id_Doctor);
      const response = await axios.post(`${URL}/patient/doctors/${payload}`, {
        id_Doctor: id_Doctor,
      });
      console.log("POST_MY_DOCTOR ACTIONNNNNNN response", response);
      return dispatch({
        type: types.POST_MY_DOCTOR,
        id_Doctor,
      });
    } catch (error) {
      alert(error); // CORREGIR! ----> EL MENSAJE A MOSTRAR TIENE QUE VENIR DEL BACK
    }
  };
};
