import React from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Box, Grid, Button } from "@mui/material";
import { useStyles } from "../styles/home";
import { teal } from "@mui/material/colors";
import Alergias from "../components/MedicalHistoryItems/Alergias";

const botonInfo = [
  {
    title: "Mis Alergias",
  },
  {
    title: "Medicaciones",
  },
  {
    title: "Enfermedades",
  },
  {
    title: "Mis Estudios",
  },
];
function MedicalHistory() {
  const classes = useStyles();
  return (
    <Box className={classes.root} sx={{ background: teal[50] }}>
      <PrimarySearchAppBar />
      <Grid container columnSpacing={2} rowSpacing={-5}>
        <Grid
          item
          container
          md={4}
          display="flex"
          justifyContent="space-evenly"
          flexDirection="column"
          alignItem="center"
          rowSpacing={3}
          style={{ height: "70vh" }}
        >
          {botonInfo.map((elemento) => (
            <Grid item>
              <Button
                variant="contained"
                component="label"
                sx={{ background: teal[700] }}
              >
                {elemento.title}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          conteiner
          md={8}
          justifyContent="center"
          alignItem="center"
          style={{ backgroundColor: teal[100] }}
        >
          <Alergias />
        </Grid>
      </Grid>
    </Box>
  );
}
export default MedicalHistory;
