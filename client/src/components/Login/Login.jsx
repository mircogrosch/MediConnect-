import React from "react";
import {
  FormControl,
  TextField,
  Box,
  Grid,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Typography,
  Button
} from "@mui/material";
import { Email, Lock, AccountCircle } from "@mui/icons-material";
import useStyles from "./styles.js";
const Login = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh",backgroundImage:"linear-gradient(to bottom, #b2dfdb, #93d7d0, #72d0c3, #4cc8b5, #00bfa5)"}}
      > 
    
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
            <AccountCircle sx={{ color: "#00695C", fontSize: 150 }} />
          </Box>
          <Box className={classes.textField}>
            <TextField
              id="input-with-xl"
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
            />
          </Box>
          <Box className={classes.textField}>
            <TextField
              sx={{width:350}}
              placeholder="Contraseña:"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#00695C" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center"}}> 
          <FormControlLabel  control={<Checkbox defaultChecked />} label="Recordame" />
          <Typography variant="p">
              Olvide mi contraseña
          </Typography>
          </Box>
          <Box sx={{display:"flex",justifyContent:"center",mt:5}}>   
          <Button variant="contained" sx={{width:350,bgcolor:"#00695C"}}>
              INICIAR SESIÓN
          </Button>
          </Box>
        </FormControl>
      </Grid>
    </div>
  );
};

export default Login;
