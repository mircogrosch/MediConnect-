import React from "react";
import { Box, Button } from "@mui/material";
import { grey, teal } from "@material-ui/core/colors";
import { useStyles } from "../../styles/selectTypeRegister/selector.js";

function Body() {
  const classes = useStyles();

  return (
    <Box>
      <h2 className={classes.typography}>Hola, ¿cómo deseas registrarte?</h2>
      <Box
        style={{
          justifyContent: "space-around",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          size="large"
          style={{
            width: "40%",
            color: grey[700],
            fontSize: "1.2em",
            backgroundColor: grey[200],
          }}
        >
          PACIENTE
        </Button>
        <Button
          variant="contained"
          size="large"
          style={{
            width: "40%",
            fontSize: "1.2em",
            backgroundColor: teal[700],
          }}
        >
          PROFESIONAL
        </Button>
      </Box>
    </Box>
  );
}

export default Body;
