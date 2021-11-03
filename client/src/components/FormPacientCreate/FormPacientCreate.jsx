import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getHealthInsurances, postPatient } from "../../actions";
import { useStyles } from "../../styles/registerForms/patient.js";
import { teal } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import SimpleAppBar from "../AppBar/SimpleAppBar";

const FormPacientCreate = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const healthInsurances = useSelector((state) => state.healthInsurances);

  const [equal, setEqual] = useState(true);
  const [visibled, setVisibled] = useState({
    password: false,
    idemPassword: false,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getHealthInsurances());
  }, []);

  const onSubmit = (data) => {
    setEqual(true);
    if (data.password !== data.idem_password) return setEqual(false);

    dispatch(postPatient(data, history));
  };

  return (
    <>
      <SimpleAppBar background={teal[900]} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography variant="h4" className={classes.title}>
            Ingresa tus datos
          </Typography>
          <FormControl>
            <TextField
              variant="standard"
              label="Nombre"
              type="text"
              className={classes.input}
              error={errors.name ? true : false}
              {...register("name", { required: true, maxLength: 30 })}
            />
            <TextField
              variant="standard"
              label="Apellido"
              type="text"
              className={classes.input}
              error={errors.lastname ? true : false}
              {...register("lastname", { required: true, maxLength: 30 })}
            />
            <TextField
              variant="standard"
              label="Email"
              type="email"
              className={classes.input}
              error={errors.email ? true : false}
              {...register("email", { required: true })}
            />
            <FormControl variant="standard">
              <InputLabel>Contraseña</InputLabel>
              <Input
                variant="standard"
                className={classes.input}
                type={visibled.password ? "text" : "password"}
                error={errors.password ? true : false}
                onChange={() => setEqual(true)}
                {...register("password", { required: true, maxLength: 30 })}
                endAdornment={
                  <IconButton
                    onClick={() =>
                      setVisibled({
                        ...visibled,
                        password: !visibled.password,
                      })
                    }
                  >
                    {visibled.password ? (
                      <Visibility sx={{ color: teal[900] }} />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel>Confirmar Contraseña</InputLabel>
              <Input
                variant="standard"
                className={classes.input}
                type={visibled.idemPassword ? "text" : "password"}
                error={errors.idem_password ? true : false}
                onChange={() => setEqual(true)}
                {...register("idem_password", {
                  required: true,
                  maxLength: 30,
                })}
                endAdornment={
                  <IconButton
                    onClick={() =>
                      setVisibled({
                        ...visibled,
                        idemPassword: !visibled.idemPassword,
                      })
                    }
                  >
                    {visibled.idemPassword ? (
                      <Visibility sx={{ color: teal[900] }} />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                }
              />

              {!equal && (
                <Typography
                  variant="body1"
                  align="right"
                  fontSize={12}
                  fontWeight="bold"
                  color="red"
                >
                  Las contraseñas no coinciden
                </Typography>
              )}
            </FormControl>
            <TextField
              variant="standard"
              label="DNI"
              type="number"
              className={classes.input}
              error={errors.dni ? true : false}
              {...register("dni", { required: true })}
            />
            <TextField
              variant="standard"
              label="Ubicacion"
              type="text"
              className={classes.input}
              error={errors.address ? true : false}
              {...register("address", { required: true })}
            />
            <TextField
              select
              variant="standard"
              label="Obra social"
              SelectProps={{
                native: true,
              }}
              className={classes.input}
              error={errors.healthInsuranceId ? true : false}
              {...register("healthInsuranceId")}
            >
              <option disabled selected>
                {" "}
              </option>
              {healthInsurances.names &&
                healthInsurances.names.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  );
                })}
            </TextField>
            <TextField
              variant="standard"
              label="N° socio"
              type="number"
              className={classes.input}
              {...register("num_member", { required: true })}
              error={errors.num_member ? true : false}
            />
          </FormControl>
        </Grid>
        <Button
          variant="contained"
          className={classes.button}
          sx={{ marginTop: "1em", fontWeight: "normal", background: teal[800] }}
          onClick={handleSubmit(onSubmit)}
        >
          Registrar
        </Button>
      </Grid>
    </>
  );
};

export default FormPacientCreate;
