import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  LocationOnOutlined,
  ArrowDropDownCircleOutlined,
  ContactMailOutlined,
} from "@mui/icons-material";

function BodyData(props) {
  const classes = props.classes;

  return (
    <Box className={classes.cardInfo}>
      <Typography variant="h6" marginBottom={3} className={classes.textName}>
        {`${props.name} ${props.lastname}`}
      </Typography>
      <Grid container>
        <Grid item xs={2} marginY={1}>
          <ContactMailOutlined className={classes.icon} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" className={classes.text}>
            {props.dni}
          </Typography>
        </Grid>
        <Grid item xs={2} marginY={1}>
          <ArrowDropDownCircleOutlined className={classes.icon} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" className={classes.text}>
            OSDE
          </Typography>
        </Grid>
        <Grid item xs={2} marginY={1}>
          <LocationOnOutlined className={classes.icon} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" className={classes.text}>
            {props.address}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BodyData;
