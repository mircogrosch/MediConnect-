import { postPatient } from "../../actions";

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
    set({ ...state, [prop]: event.target.value})
    console.log(state);
}
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
}

export const handleSubmit = (e, errors, state, set, dispatch) => {
  e.preventDefault();
  console.log('este es el estado', state)
  if(errors.name||errors.lastname||errors.email||errors.password||errors.idemPass||errors.dni||errors.address){
    alert('Hay campos sin completar')
  } else {
      dispatch(postPatient(state))
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
        // os: "",
        // plan: "",
        num_member: "",
      });
  }
}

