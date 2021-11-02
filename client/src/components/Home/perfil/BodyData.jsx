import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import {
  LocationOnOutlined,
  ArrowDropDownCircleOutlined,
  ContactMailOutlined,
} from "@mui/icons-material";

function BodyData(props) {
  const classes = props.classes;

  return (

    <Box className={classes.cardInfo} sx={{ background: props.bgColor }}>
      <Typography 
        variant="h6"
        marginBottom={3}
        className={classes.textName}
        color={props.color || grey[600]}
       >
        {`${props.name} ${props.lastname}`}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={2} marginY={1}>
          <ContactMailOutlined sx={{ color: props.color || teal[900] }} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[700]}>
            {props.dni}
        </Grid>
        <Grid item xs={2} marginY={1}>
          <ArrowDropDownCircleOutlined
            sx={{ color: props.color || teal[900] }}
          />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[700]}>
            OSDE
          </Typography>
        </Grid>
        <Grid item xs={2} marginY={1}>
          <LocationOnOutlined sx={{ color: props.color || teal[900] }} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[700]}>
            {props.address}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BodyData;
