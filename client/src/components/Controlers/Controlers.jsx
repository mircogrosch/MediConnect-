export const handleSubmitProfesional = (event, set) => {
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
    medicalRegistration: "",
  });
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
