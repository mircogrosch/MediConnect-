import React from "react ";
import { Grid, Typography, Button } from "@mui/material";
import { teal } from "@mui/material";
import circleUser from "../img/user.png";

function DoctorCard({ name, lastname, imageProfile, speciality }) {
  const doctorName = `${name} ${lastname}`;

  return (
    <Grid
      container
      bgcolor={teal[600]}
      alignItems="center"
      sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
    >
      <Grid item xs={1}>
        <img
          src={imageProfile || circleUser}
          alt="circle user"
          style={{ width: "50px" }}
        />
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" color={teal[50]}>
          {doctorName}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" color={teal[50]}>
          {speciality}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          sx={{ width: "100%", height: "50px", bgcolor: teal[900] }}
        >
          Cambiar
        </Button>
      </Grid>
    </Grid>
  );
}

export default DoctorCard;
