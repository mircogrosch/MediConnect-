import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import circleUser from "../../../img/user.png";

function DoctorCard({ name, lastname, imageProfile, specialities, previousStep }) {
  const doctorName = `Dr. ${name} ${lastname}`;

  return (
    <Grid
      container
      bgcolor={teal[600]}
      alignItems="center"
      sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
    >
      <Grid item md={1}>
        <img
          src={imageProfile || circleUser}
          alt="circle user"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
      </Grid>
      <Grid item md={4}>
        <Typography variant="h6" color={teal[50]}>
          {doctorName}
        </Typography>
      </Grid>
      <Grid item md={5}>
        <Typography variant="h6" color={teal[50]}>
          {specialities}
        </Typography>
      </Grid>
      <Grid item md={2}>
        <Button
          variant="contained"
          onClick={() => previousStep()}
          sx={{ width: "100%", height: "50px", bgcolor: teal[900] }}
        >
          Cambiar
        </Button>
      </Grid>
    </Grid>
  );
}

export default DoctorCard;
