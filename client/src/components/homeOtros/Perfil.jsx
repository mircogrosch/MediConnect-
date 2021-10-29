import React from "react";
import { teal } from "@mui/material/colors";
import { ModeEditOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useStyles } from "../../styles/otroHome/perfil";
import circleUser from "../../img/user.png";
import BodyData from "./perfil/BodyData";

function Perfil() {
  const classes = useStyles();

  return (
    <Grid container md={4} sm={5} xs={12} className={classes.root}>
      <IconButton
        style={{
          position: "absolute",
          top: ".5em",
          right: ".5em",
        }}
      >
        <ModeEditOutlined fontSize="medium" style={{ color: teal[800] }} />
      </IconButton>
      <img src={circleUser} alt="user profile" className={classes.circleUser} />
      <BodyData classes={classes} />
    </Grid>
  );
}

export default Perfil;
