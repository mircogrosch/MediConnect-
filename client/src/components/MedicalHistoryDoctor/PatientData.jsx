import React from "react";
import { Grid, Box, Typography } from "@mui/material";

function PatientData({ data }) {
  return (
    <Box
      container
      sx={{ padding: "1em", alignItems: "center", display: "flex" }}
    >
      <Grid item>
        <img
          src={data.image}
          alt="Patient Profile"
          style={{ width: "120px", height: "120px", borderRadius: "50%" }}
        />
      </Grid>
      <Grid item marginLeft="1em">
        <Typography variant="h4">
          {data.name} {data.lastname}
        </Typography>
        <Typography variant="h6">DNI: {data.dni}</Typography>
      </Grid>
    </Box>
  );
}

export default PatientData;
