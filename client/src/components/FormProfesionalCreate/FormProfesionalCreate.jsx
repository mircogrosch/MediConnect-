import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpecialities } from "../../actions/index";
import {
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Signature from "./Signature/Signature";
import useStyles from "./styles";
import SimpleAppBar from "../AppBar/SimpleAppBar";
import { useForm } from "react-hook-form";
import { postDoctor } from "../../actions/index";
import swal from "sweetalert";
import { teal } from "@mui/material/colors";

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
  const [input, setInput] = useState({ signature: "" });
  const [visibled, setVisibled] = useState({
    password: false,
    idemPassword: false,
  });
  const [equal, setEqual] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setEqual(true);
    if (data.password !== data.confirmPass) return setEqual(false);
    data.signature = input.signature;
    dispatch(postDoctor(data));
    swal({
      title: `El registro fue exitoso`,
      // dangerMode: false,
      // icon: "error",
      button: "Continuar",
    });
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  let allSpecialities = useSelector((state) => state.allSpecialities);
  allSpecialities = allSpecialities.allSpecialities;

  useEffect(() => {
    dispatch(getSpecialities());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        marginTop="60px"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={3}>
          <MyTitle variant="h4" align="center">
            Ingresa tus datos
          </MyTitle>
          <SimpleAppBar background={teal[900]}></SimpleAppBar>
          <FormControl>
            <MyInput
              id="standard-basic"
              label="Nombre"
              error={errors.name ? true : false}
              {...register("name", { required: true })}
              variant="standard"
            />
            <MyInput
              id="standard-basic"
              label="Apellido"
              error={errors.lastname ? true : false}
              {...register("lastname", { required: true })}
              variant="standard"
            />

            <MyInput
              id="standard-basic"
              label="Email"
              error={errors.email ? true : false}
              {...register("email", { required: true })}
              variant="standard"
            />

            <FormControl variant="standard">
              <InputLabel htmlFor="standar-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                id="standar-adornment-password"
                onChange={() => setEqual(true)}
                type={visibled.password ? "text" : "password"}
                error={errors.password ? true : false}
                {...register("password", { required: true })}
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
                    {visibled.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="standar-adornment-password">
                Confirme contraseña
              </InputLabel>
              <Input
                id="standar-adornment-password"
                onChange={() => setEqual(true)}
                type={visibled.idemPassword ? "text" : "password"}
                error={errors.confirmPass ? true : false}
                {...register("confirmPass", {
                  required: true,
                })}
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
                    {visibled.idemPassword ? <VisibilityOff /> : <Visibility />}
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
            <MyInput
              id="standard-basic"
              type="number"
              error={errors.dni ? true : false}
              label="DNI"
              {...register("dni", { required: true })}
              variant="standard"
            />
            <MyInput
              id="standard-basic"
              label="Dirección"
              error={errors.confirmPass ? true : false}
              {...register("address", { required: true })}
              variant="standard"
            />

            <TextField
              id="filled-select-currency-native"
              select
              label="Especialidad"
              error={errors.specialities ? true : false}
              {...register("specialities", { required: true })}
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              {" "}
              <option selected disabled>
                Especialidad
              </option>
              {allSpecialities.map((a) => {
                return (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                );
              })}
            </TextField>
            <MyInput
              id="standard-basic"
              label="N° matrícula"
              error={errors.enrollment ? true : false}
              type="number"
              {...register("enrollment", { required: true })}
              variant="standard"
            />
            <Signature state={input} setState={setInput} />
            <MyButton onClick={handleSubmit(onSubmit)} variant="contained">
              Registrar
            </MyButton>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormProfesionalCreate;
