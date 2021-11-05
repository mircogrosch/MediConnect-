import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  TextField,
  Box,
  Grid,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { Email, Lock, AccountCircle } from "@mui/icons-material";
import useStyles from "./styles.js";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
} from "../Controlers/Controlers";
import { getUser } from "../../actions/index.js";
import { useHistory } from "react-router-dom";
import { validateUser } from "../Controlers/Controlers";
import SimpleAppBar from "../AppBar/SimpleAppBar";


const Login = () => {
  //Local states
  const [input, setInput] = useState({ email: "", password: "" });
  const [handlePassword, setPassword] = useState({ showPassword: false });
  //Global States
  const token = useSelector((state)=> state.users.state)
  
 
  
  //Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

   useEffect(() => {
      validateUser(token, history);
   }, [token]);

  return (
    <div className={classes.root}>
      <SimpleAppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
            <AccountCircle sx={{ color: "#00695C", fontSize: 150 }} />
          </Box>
          <Box className={classes.textField}>
            <TextField
              id="input-with-xl"
              type="email"
              placeholder="Email:"
              variant="standard"
              sx={{ width: 350 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: "#00695C" }} />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange("email", input, setInput)}
            />
          </Box>
          <Box className={classes.textField}>
            <TextField
              id="standard-adornment-password"
              type={handlePassword.showPassword ? "text" : "password"}
              value={input.password}
              sx={{ width: 350 }}
              placeholder="Contraseña:"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#00695C" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleClickShowPassword(handlePassword, setPassword)
                      }
                      onMouseDown={(e) => handleMouseDownPassword(e)}
                    >
                      {input.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange("password", input, setInput)}
            />
          </Box>
          {/* <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
          <FormControlLabel  control={<Checkbox defaultChecked />} label={
          <Typography variant="p" color={theme.palette.primary.dark}> 
              Recordame
          </Typography>}/>
          <Typography variant="p" color={theme.palette.primary.dark}>
              Olvide mi contraseña
          </Typography>
          </Box> */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              sx={{ width: 350, bgcolor: "#00695C" }}
              onClick={() => dispatch(getUser(input))}
            >
              INICIAR SESIÓN
            </Button>
          </Box>
        </FormControl>
      </Grid>
    </div>
  );
};

export default Login;
