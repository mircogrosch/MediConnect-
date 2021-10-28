import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import logo from "../../img/mediconnect-logo.png";
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  logoContainer: {
    flexGrow: "1",
    fontWeight: "normal",
  },
  logo: {
    width: "200px",
  },
});

function Appbar() {
  const classes = useStyles();

  return (
    <AppBar
      className={classes.appbar}
      style={{ background: "transparent" }}
      elevation={0}
    >
      <Toolbar>
        <Box className={classes.logoContainer}>
          <img src={logo} alt="MediConnect+" className={classes.logo} />
        </Box>
        <div>
        <Link to="/login">  <Button
            variant="contained"
            style={{
              background: "#b2dfdb",
              boxShadow: "none",
              marginRight: "1em",
              color: "#009688",
            }}
          >
            INICIAR SESIÓN
          </Button> </Link>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#009688",
              boxShadow: "none",
            }}
          >
            REGISTRARME
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
