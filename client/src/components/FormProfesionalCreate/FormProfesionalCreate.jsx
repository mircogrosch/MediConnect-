import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  handleClickShowPassword,
  handleClickShowConf,
  handleMouseDownPassword,
  handleSubmitProfesional,
} from "../Controlers/Controlers";
import Signature from "./Signature/Signature";
import useStyles from "./styles";

const MyButton = styled(Button)({
  width: "500px",
  margin: "20px",
  fontSize: "20px",
  fontWeight: "200",
  padding: "0px",
});
const MyInput = styled(TextField)({
  borderBottomColor: "green",
  width: "500px",
});
const MyTitle = styled(Typography)({
  marginTop: "20px",
  color: "#878787",
});

const FormProfesionalCreate = () => {
  let errors = {};

  const [input, setInput] = useState({
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

  // ACA VAN LAS VALIDACIONES
  if (input.password === input.confirmPass) {
    errors.idemPass = "Contraseña distinta";
  }
  // ----------------------------------------

  // ESTA FUNCION ESTA ACA TEMPORALMENTE, HASTA QUE UNIFIQUEMOS DE QUE FORMA IMPLEMENTAMOS EL handleChange() EN CONTROLERS
  const handleChange = (event, input, setInput) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  //-----------------------------------------------------------------------------------------------------------------------
  const specialties = [
    {
      value: "",
    },
    {
      value: "Nutrición",
    },
    {
      value: "Pediatría",
    },
    {
      value: "Traumatologia",
    },
    {
      value: "Psicología",
    },
  ];

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <MyTitle variant="h4" align="center">
            Ingresa tus datos
          </MyTitle>

          <FormControl>
            <MyInput
              id="standard-basic"
              label="Nombre"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />

            <MyInput
              id="standard-basic"
              label="Apellido"
              value={input.lastname}
              name="lastname"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />

            <MyInput
              id="standard-basic"
              label="Email"
              value={input.email}
              name="email"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />

            <FormControl variant="standard">
              <InputLabel htmlFor="standar-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                id="standar-adornment-password"
                type={input.showPassword ? "text" : "password"}
                value={input.password}
                name="password"
                onChange={(e) => handleChange(e, input, setInput)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowPassword(input, setInput)}
                      onMouseDown={(e) => handleMouseDownPassword(e)}
                    >
                      {input.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="standar-adornment-password">
                Confirme contraseña
              </InputLabel>
              <Input
                error={errors.idemPass ? false : true}
                id="standar-adornment-password"
                type={input.showConf ? "text" : "password"}
                value={input.confirmPass}
                name="confirmPass"
                onChange={(e) => handleChange(e, input, setInput)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleClickShowConf(input, setInput)}
                      onMouseDown={(e) => handleMouseDownPassword(e)}
                    >
                      {input.showConf ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <MyInput
              id="standard-basic"
              label="DNI"
              value={input.dni}
              name="dni"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />
            <MyInput
              id="standard-basic"
              label="Ubicación"
              value={input.address}
              name="address"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />

            <TextField
              id="filled-select-currency-native"
              select
              label="Especialidad"
              value={input.speciality}
              name="speciality"
              onChange={(e) => handleChange(e, input, setInput)}
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              {specialties.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </TextField>

            <MyInput
              id="standard-basic"
              label="N° matrícula"
              value={input.medicalRegistration}
              name="medicalRegistration"
              onChange={(e) => handleChange(e, input, setInput)}
              variant="standard"
            />
            <Signature state={input} setState={setInput} />
            <MyButton
              onClick={(e) => handleSubmitProfesional(e, setInput)}
              variant="contained"
            >
              Registrar
            </MyButton>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormProfesionalCreate;
