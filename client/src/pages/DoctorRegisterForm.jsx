import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getSpecialities, postDoctor } from "../actions";
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Input,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Button,
  LinearProgress,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useStyles } from "../styles/registerForms/doctors";
import axios from "axios";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import Signature from "../components/Signature/Signature";
import CheckIcon from "@mui/icons-material/Check";

function DoctorRegisterForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [checkUpLoad, setCheckUpLoad] = useState(false);
  const [imgPerfil, setImgPerfil] = useState(null);
  const [equal, setEqual] = useState(true);
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [towns, setTowns] = useState([]);
  const [imgURL, setImgURL] = useState(null);
  const [visibled, setVisibled] = useState({
    password: false,
    idemPassword: false,
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    dispatch(getSpecialities());
    getProvinces();
  }, [dispatch]);

  useEffect(() => {
    provinceId && getTowns(provinceId);
  }, [provinceId]);

  const allSpecialities = useSelector(
    (state) => state.allSpecialities.allSpecialities
  );

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImgPerfil(file);
    setCheckUpLoad(true);
  };

  const onSubmit = (data) => {
    setEqual(true);
    data.location = provinces.find(
      (province) => province.id === provinceId
    ).nombre;
    data.address = towns.find((town) => town.id === data.address).nombre;

    if (data.password !== data.confirmPass) return setEqual(false);

    const user = new FormData();
    user.append("name", data.name);
    user.append("lastname", data.lastname);
    user.append("image", imgPerfil);
    user.append("email", data.email);
    user.append("password", data.password);
    user.append("dni", data.dni);
    user.append("enrollment", data.enrollment);
    user.append("specialities", data.specialities);
    user.append("address", data.address);
    user.append("location", data.location);
    user.append("signature", imgURL);
    setDisabledButton(true);
    dispatch(postDoctor(user, history, setLoadingProgress));
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

  return (
    <Box>
      <SimpleAppBar background={teal[900]} />
      <Box
        className={classes.root}
        sx={{
          marginTop: { sm: "0", xs: "2em" },
        }}
      >   
        <Box sx={{ width: { lg: "60vw", md: "70vw", xs: "90vw" }, marginTop:10}}> 
          <Grid container rowSpacing={1}>
            <Grid item sm={6} xs={12}>
              <InputLabel>Nombre</InputLabel>
              <TextField
                variant="standard"
                error={errors.name ? true : false}
                {...register("name", { required: true })}
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
                error={errors.confirmPass ? true : false}
                {...register("confirmPass", {
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
              <InputLabel>N˚ Matrícula</InputLabel>
              <TextField
                variant="standard"
                type="number"
                error={errors.enrollment ? true : false}
                {...register("enrollment", { required: true })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Especialidad</InputLabel>
              <Select
                variant="standard"
                defaultValue=""
                error={errors.specialities ? true : false}
                {...register("specialities", { required: true })}
                sx={{ width: "100%" }}
              >
                {allSpecialities.map((a) => {
                  return (
                    <MenuItem key={a.id} value={a.id}>
                      {a.name}
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
                error={errors.address ? true : false}
                {...register("address", { required: true })}
                sx={{ width: "100%" }}
              >
                {towns.map((town) => (
                  <MenuItem key={town.id} value={town.id}>
                    {town.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Signature
                imgURL={imgURL}    
                setImgURL={setImgURL}
                bgColor={teal[900]}
              />
            </Grid>

            <Grid item xs={12}>
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
                  marginBottom:10
                }}
                disabled={disabledButton}
              >
                REGISTRAR
              </Button>
              {disabledButton ? (
                <LinearProgress variant="determinate" value={loadingProgress} />
              ) : (
                false
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default DoctorRegisterForm;
