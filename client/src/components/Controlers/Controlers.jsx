import { postPatient } from "../../actions";
import swal from "sweetalert";
import { filterSpecialities } from "../../actions/index";
import jwt from "jsonwebtoken";
export const handleChange = (prop, state, set) => (event) => {
  set({ ...state, [prop]: event.target.value });
};
// Controla los cambios del componente "Select especialidad"
// VER, SI NO SE USA, BORRARLA
export const handleSelect = (e, state, set, dispatch) => {
  set(e.target.value);
  dispatch(filterSpecialities(e.target.value));
};
export const handleChangeSpecial = (e, state, set) => {
  set(e.target.value);
};

export const handleClickShowPassword = (state, set) => {
  set({
    ...state,
    showPassword: !state.showPassword,
  });
};

export const handleClickShowConf = (state, set) => {
  set({
    ...state,
    showConf: !state.showConf,
  });
};

export const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

export const handleSubmit = (e, errors, state, set, dispatch, history) => {
  e.preventDefault();
  if (
    errors.name ||
    errors.lastname ||
    errors.email ||
    errors.password ||
    errors.idemPass ||
    errors.dni ||
    errors.address
  ) {
    alert("Hay campos sin completar");
  } else {
    dispatch(postPatient(state));
    set({
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPass: "",
      showPassword: false,
      showConf: false,
      dni: "",
      address: "",
      healthInsuranceId: "",
      // plan: "",
      num_member: "",
    });
    history.push("/login");
  }
};

/**
 * Valida que haya un usuario logeado y cual es su rol, si no está logeado lo regresa al login.
 */

export const validateUser = (token, history) => {
  if (token) {
    const userLog = JSON.parse(sessionStorage.getItem("user"))?.token;
    if (userLog) {
      const decoded = jwt.verify(userLog, "secret");
      if (decoded.user.rol === "Patient") {
        return history.push("/account/patient");
      } else if (decoded.user.rol === "Doctor") {
        return history.push("/account/profesional");
      }
    } else if (token.message) {
      swal({
        title: `${token.message}`,
        icon: "error",
        text: "Por favor vuelve a intentar",
        buttons: "Reintentar",
      });
    }
  }
};
