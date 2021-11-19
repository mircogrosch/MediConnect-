import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getHealthInsurances, postPatient } from "../actions";
import { useStyles } from "../styles/registerForms/patient.js";
import { teal } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Input,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  LinearProgress
} from "@mui/material";
import axios from "axios";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import CheckIcon from "@mui/icons-material/Check";
const PatientRegisterForm = () => {
  

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [checkUpLoad, setCheckUpLoad] = useState(false);
  const [imgPerfil, setImgPerfil] = useState(null);
  const [equal, setEqual] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [townId, setTownId] = useState("");
  const [towns, setTowns] = useState([]);
  const [visibled, setVisibled] = useState({
    password: false,
    idemPassword: false,
  });
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false);

  const healthInsurances = useSelector((state) => state.healthInsurances);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getHealthInsurances());
    getProvinces();
  }, [dispatch]);

  useEffect(() => {
    provinceId && getTowns(provinceId);
  }, [provinceId]);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImgPerfil(file);
    setCheckUpLoad(true);
  };
  const handleLoadingProgress = (percent)=>{ 
    setLoadingProgress(percent);
  }

  const onSubmit = (data) => {
    setEqual(true);

    if (data.password !== data.idemPassword) return setEqual(false);

    let province = provinces.find(
      (province) => province.id === provinceId
    ).nombre;

    let town = towns.find((town) => town.id === townId).nombre;

    data.address = `${town}, ${province}`;

    console.log(data);

    const user = new FormData();
    user.append("name", data.name);
    user.append("lastname", data.lastname);
    user.append("image", imgPerfil);
    user.append("email", data.email);
    user.append("password", data.password);
    user.append("dni", data.dni);
    user.append("num_member", data.num_member);
    user.append("healthInsuranceId", data.healthInsuranceId);
    user.append("address", data.address);
    user.append("location", data.location);
    setDisabledButton(true)
    dispatch(postPatient(user, history,handleLoadingProgress));
  };

  const getProvinces = async () => {
    try {
      const response = await axios.get(
        "https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre"
      );
      setProvinces(response.data.provincias);
    } catch (error) {
      console.log("Error", error);
      alert(error);
    }
  };

  const getTowns = async (provinceId) => {
    const response = await axios.get(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceId}&campos=id,nombre&max=150`
    );
    setTowns(response.data.municipios);
  };
 
  console.log("ESTE ES EL PROGRESS", loadingProgress)
  return (
    <Box>
      <SimpleAppBar background={teal[900]} />
      <Box
        className={classes.root}
        sx={{
          marginTop: { sm: "0", xs: "2em" },
        }}
      >
       
        <Box sx={{ width: { lg: "60vw", md: "60vw", xs: "90vw" },marginTop:4}}>
          <Grid container rowSpacing={1}>
            <Grid item sm={6} xs={12}>
              <InputLabel>Nombre</InputLabel>
              <TextField
                variant="standard"
                type="text"
                error={errors.name ? true : false}
                {...register("name", { required: true, maxLength: 30 })}
                sx={{ width: { sm: "90%", xs: "100%" } }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Apellido</InputLabel>
              <TextField
                variant="standard"
                error={errors.lastname ? true : false}
                {...register("lastname", { required: true })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Email</InputLabel>
              <TextField
                variant="standard"
                error={errors.email ? true : false}
                {...register("email", { required: true })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Contraseña</InputLabel>
              <Input
                onChange={() => setEqual(true)}
                type={visibled.password ? "text" : "password"}
                error={errors.password ? true : false}
                {...register("password", { required: true })}
                sx={{ width: { sm: "90%", xs: "100%" } }}
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
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
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Confirme contraseña</InputLabel>
              <Input
                onChange={() => setEqual(true)}
                type={visibled.idemPassword ? "text" : "password"}
                error={errors.idemPassword ? true : false}
                {...register("idemPassword", {
                  required: true,
                })}
                sx={{ width: "100%" }}
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
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
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>DNI</InputLabel>
              <TextField
                variant="standard"
                type="number"
                error={errors.dni ? true : false}
                {...register("dni", { required: true })}
                sx={{ width: { sm: "90%", xs: "100%" } }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>N° socio</InputLabel>
              <TextField
                variant="standard"
                type="number"
                error={errors.num_member ? true : false}
                {...register("num_member", { required: true })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Obra social</InputLabel>
              <Select
                variant="standard"
                defaultValue=""
                error={errors.healthInsuranceId ? true : false}
                {...register("healthInsuranceId", { required: true })}
                sx={{ width: "100%" }}
              >
                {healthInsurances.names &&
                  healthInsurances.names.map((health) => {
                    return (
                      <MenuItem key={health.id} value={health.id}>
                        {health.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Provincia</InputLabel>
              <Select
                variant="standard"
                defaultValue=""
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
                error={errors.province ? true : false}
                sx={{ width: { sm: "90%", xs: "100%" } }}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item sm={6} xs={12}>
              <InputLabel>Municipio</InputLabel>
              <Select
                variant="standard"
                defaultValue=""
                value={townId}
                onChange={(e) => setTownId(e.target.value)}
                error={errors.town ? true : false}
                sx={{ width: "100%" }}
              >
                {towns.map((town) => (
                  <MenuItem key={town.id} value={town.id}>
                    {town.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} marginTop={1}>
              <Button
                variant="contained"
                component="label"
                id="image"
                name="image"
                onChange={handleChange}
                sx={{ background: teal[900] }}
              >
                ELEGIR IMAGEN DE PERFIL
                <input type="file" hidden />
                {checkUpLoad ? (
                  <CheckIcon sx={{ bgColor: teal[900] }} />
                ) : (
                  false
                )}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                className={classes.button}
                sx={{
                  marginTop: "1em",
                  fontSize: "16px",
                  background: teal[900],
                }}
                disabled={disabledButton}
              >
                REGISTRAR
              </Button>
              {
              disabledButton ? <LinearProgress variant="determinate" value={loadingProgress}/> : false
              }
            </Grid>
            
            
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientRegisterForm;
