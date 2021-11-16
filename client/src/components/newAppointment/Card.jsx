import { Box, Icon, Typography, Grid } from "@material-ui/core";
import React from "react";
import { AccountCircle } from "@mui/icons-material";
import ButtonFoward from "./ButtonFoward";
import { teal } from "@mui/material/colors";

const Card = ({
  key,
  name,
  lastname,
  work_days,
  address,
  email,
  idPatient,
  idDoctor,
  image,
  specialities,
}) => {
  let docName = `Dr ${name} ${lastname}`;

  let string_work_days = "";
  work_days.forEach((e) => (string_work_days = string_work_days + e.day + " "));

  return (
    <Box
      bgcolor={work_days.length ? teal[200] : teal[50]}
      width="60vw"
      height="75px"
      borderRadius="7px"
      padding="1em 0em 0em 1em"
    >
      <Grid
        container
        // bgcolor={teal[600]}
        alignItems="center"
        justifyContent="center"
        display="flex"
        rowSpacing={-1}
        sx={{ width: "70vw", padding: "0.5em 1em", borderRadius: "5px" }}
      >
        <Grid item md={1}>
          <img
            src={image || AccountCircle}
            alt="circle user"
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1" color={teal[50]}>
            {docName}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1" color={teal[50]}>
            {specialities}
          </Typography>
        </Grid>
        <Grid item md={3}>
          <Typography variant="body1">
            {string_work_days ? string_work_days : "Sin config de agenda"}
          </Typography>
        </Grid>
        <Grid item md={2}>
          <ButtonFoward
            obj={{
              name,
              lastname,
              idDoctor,
              idPatient,
              image,
              specialities,
              work_days,
            }}
            sx={{ width: "100%", height: "50px", bgcolor: teal[900] }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Card;
