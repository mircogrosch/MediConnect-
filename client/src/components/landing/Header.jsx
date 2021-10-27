import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import image from "../../img/Ellipse 3.png";

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
    height: "50vh",
    borderRadius: "40%",
  },
  textContainer: {
    width: "60%",
  },
});

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.textContainer}>
        <h2 className={classes.subtitle} style={{ lineHeight: "1.2em" }}>
          Tu plataforma de telemedicina completa y gratis
        </h2>
        <p className={classes.paragraph} style={{ lineHeight: "1.2em" }}>
          Cobra tus consultas, gestiona tus citas a través de la agenda digital,
          habla con tus pacientes por chat, o videoconsulta y mucho más.
        </p>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: "#009688",
            fontSize: "1em",
            fontWeight: "bold",
          }}
        >
          REGISTRATE GRATIS
        </Button>
      </Box>
      <Box>
        <img className={classes.image} src={image} alt="enfermera" />
      </Box>
    </div>
  );
}

export default Header;
