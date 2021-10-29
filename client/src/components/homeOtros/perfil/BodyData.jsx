import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  LocationOnOutlined,
  ArrowDropDownCircleOutlined,
  ContactMailOutlined,
} from "@mui/icons-material";
import { teal, grey } from "@mui/material/colors";

function BodyData(props) {
  const classes = props.classes;

  return (
    <Grid alignItems="center" className={classes.body} container>
      <Grid item xs={12} style={{ marginBottom: "1em" }}>
        <p className={classes.name}>Juan Carlos Villegas</p>
      </Grid>
      <Grid item container xs={12} style={{ marginBottom: ".6em" }}>
        <Grid item xs={2}>
          <LocationOnOutlined style={{ color: teal[800] }} />
        </Grid>
        <Grid item xs={10}>
          <Typography style={{ textAlign: "left", color: grey[600] }}>
            35.123.123
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} style={{ marginBottom: ".6em" }}>
        <Grid item xs={2}>
          <ArrowDropDownCircleOutlined style={{ color: teal[800] }} />
        </Grid>
        <Grid item lxs={10}>
          <Typography style={{ textAlign: "left", color: grey[600] }}>
            OSDE
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={2}>
          <ContactMailOutlined style={{ color: teal[800] }} />
        </Grid>
        <Grid item xs={10}>
          <Typography style={{ textAlign: "left", color: grey[600] }}>
            Trevelin, Chubut
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BodyData;
