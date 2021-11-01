import { postDoctor } from "../../actions/index";

export const handleSelectProfesional = (event, input, setInput) => {
  setInput({
    ...input,
    specialities: [event.target.value],
  });
};

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
    specialities: [],
    signature: "",
    enrollment: "",
  });
  dispatch(postDoctor(state));
  console.log(state);
  alert("Usuario registrado exitosamente");
  history.push("/login");
};

export const handleChange = (prop, state, set) => (event) => {
  set({ ...state, [prop]: event.target.value });
  console.log(state);
};
export const handleChangeSpecial = (e, state, set) => {
  set(e.target.value);
  console.log(state);
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

export const handleSubmit = (e, state, set) => {
  e.preventDefault();
  console.log("este es el estado", state);
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
    os: "",
    plan: "",
    numSoc: "",
  });
};
