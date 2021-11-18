import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import image from "../../img/Ellipse16.png";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    margin: "0 2em",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  subtitle: {
    fontSize: "2.8em",
    fontWeight: "normal",
    margin: "0",
    color: "#009688",
  },
  paragraph: {
    fontSize: "1.5em",
    color: "#009688",
  },
  image: {
    width: "100%",
    height: "80vh",
    borderRadius: "40%",
  },
  textContainer: {
    width: "60%",
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.textContainer}>
        <h2 className={classes.subtitle} style={{ lineHeight: "1.2em" }}>
          Agenda citas a través de MediConnect
        </h2>
        <p className={classes.paragraph} style={{ lineHeight: "1.2em" }}>
          Hazlo de manera inmediata con la agenda de cada especialidad
          actualizada al instante.
        </p>
      </Box>
      <Box style={{ textAlign: "center" }}>
        <img className={classes.image} src={image} alt="enfermera" />
      </Box>
    </div>
  );
}

export default Footer;
