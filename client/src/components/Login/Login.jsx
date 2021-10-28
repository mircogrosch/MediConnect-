import React,{useState} from "react";
import {useDispatch} from "react-redux"
import {
  FormControl,
  TextField,
  Box,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";
import { Email, Lock, AccountCircle } from "@mui/icons-material";
import useStyles from "./styles.js";
import LogoMediConnect from '../../img/mediconnect-logo.png'
import theme from '../../themes/index.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {handleChange,handleClickShowPassword,handleMouseDownPassword} from '../Controlers/Controlers'
import {getUser} from '../../actions/index.js'
const Login = () => {
//Local states
const [input,setInput] = useState({email:"",password:""});
const [handlePassword,setPassword] = useState({showPassword:false})

//Hooks
  const classes = useStyles();
  const dispatch= useDispatch();
  return (
    <div className={classes.root}>
      <AppBar sx={{bgcolor:"transparent"}} elevation={0} > 
          <Toolbar>
            <img src={LogoMediConnect} alt="logo" width="200"/>
          </Toolbar>
        </AppBar> 
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh"}}
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
              sx={{width:350}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email style={{ color: "#00695C" }} />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange("email",input,setInput)}
            />
          </Box>
          <Box className={classes.textField}>
            <TextField
              id="standard-adornment-password"
              type={handlePassword.showPassword ? 'text' : 'password'}
              value={input.password}
              sx={{width:350}}
              placeholder="Contraseña:"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#00695C" }} />
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position='end'>
                   <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => handleClickShowPassword(handlePassword,setPassword)}
                    onMouseDown={(e) => handleMouseDownPassword(e)}>
                    {input.showPassword ? <VisibilityOff/> : <Visibility/>}
                   </IconButton>
                   </InputAdornment>
                ),
              }}
            
              onChange={handleChange("password",input,setInput)}
            />
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
          <FormControlLabel  control={<Checkbox defaultChecked />} label={
          <Typography variant="p" color={theme.palette.primary.dark}> 
              Recordame
          </Typography>}/>
          <Typography variant="p" color={theme.palette.primary.dark}>
              Olvide mi contraseña
          </Typography>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center",mt:5}}>   
          <Button variant="contained" sx={{width:350,bgcolor:"#00695C"}} onClick={dispatch(getUser(input))}>
              INICIAR SESIÓN
          </Button>
          </Box>
        </FormControl>
      </Grid>
    </div>
  );
};

export default Login;
