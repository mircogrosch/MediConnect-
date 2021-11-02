import { postPatient, postDoctor } from "../../actions";
import swal from 'sweetalert';

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
    set({ ...state, [prop]: event.target.value})
}
export const handleChangeSpecial = (e, state, set) => {
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

export const handleSubmit = (e, errors, state, set, dispatch, history) => {
  e.preventDefault();
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
        healthInsuranceId: "",
        // plan: "",
        num_member: "",
      });
      history.push('/login')
  }
} 


/** 
 * Valida que haya un usuario logeado y cual es su rol, si no está logeado lo regresa al login. 
*/ 
 
export const validateUser=(user,history)=>{   
    if(!user){ 
      return swal({
        title:`El nombre de usuario o la contraseña son incorrectos`,
        dangerMode:true,
        icon:"error",
        button:"Continuar"
      })
    }
    if(user.rol === "Patient"){
     return  history.push("/account/patient")
    } else if(user.rol === "Doctor"){
      return history.push("/account/profesional")
    }
}

}

