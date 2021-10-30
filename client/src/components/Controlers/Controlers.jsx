import { postDoctor } from "../../actions/index";

export const handleSubmitProfesional = (
  event,
  state,
  set,
  dispatch,
  history
) => {
  event.preventDefault();
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
    speciality: "",
    signature: "",
    enrollment: "",
  });
  dispatch(postDoctor(state));
  alert("Usuario registrado exitosamente");
  history.push("/login");
};

export const handleChange = (prop, state, set) => (event) => {
  set({ ...state, [prop]: event.target.value });
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
