import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { teal, grey } from "@mui/material/colors";
import {
  LocationOnOutlined,
  ArrowDropDownCircleOutlined,
  ContactMailOutlined,
  EmailOutlined,
  LocalHospitalOutlined,
} from "@mui/icons-material";

function BodyData(props) {
  const classes = props.classes;

  return (
    <Box
      sx={{
        width: "100%",
        paddingY: "1em",
        background: props.bgColor,
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h6"
        marginBottom={3}
        className={classes.textName}
        color={props.color || grey[50]}
      >
        {`${props.name} ${props.lastname}`}
      </Typography>
      <Grid container alignItems="center">
        <Grid item xs={2} marginY={1}>
          <ContactMailOutlined sx={{ color: props.color || teal[50] }} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[50]}>
            {props.dni}
          </Typography>
        </Grid>

        {props.user.rol === "Patient" ? (
          <>
            <Grid item xs={2} marginY={1}>
              <ArrowDropDownCircleOutlined
                sx={{ color: props.color || teal[50] }}
              />
            </Grid>
            <Grid item xs={10} marginY={1} textAlign="left">
              <Tooltip title={`${props.healthInsurance}`} arrow>
                <Typography variant="p" color={props.color || grey[50]}>
                  OBRA SOCIAL
                </Typography>
              </Tooltip>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={2} marginY={1}>
              <LocalHospitalOutlined sx={{ color: props.color || teal[50] }} />
            </Grid>
            <Grid item xs={10} marginY={1} textAlign="left">
              <Typography variant="p" color={props.color || grey[50]}>
                {props.enrollment}
              </Typography>
            </Grid>
          </>
        )}

        <Grid item xs={2} marginY={1}>
          <EmailOutlined sx={{ color: props.color || teal[50] }} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[50]}>
            {props.email}
          </Typography>
        </Grid>

        <Grid item xs={2} marginY={1}>
          <LocationOnOutlined sx={{ color: props.color || teal[50] }} />
        </Grid>
        <Grid item xs={10} marginY={1} textAlign="left">
          <Typography variant="p" color={props.color || grey[50]}>
            {props.address}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BodyData;
