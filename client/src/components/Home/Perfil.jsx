import React from "react";
import { teal } from "@mui/material/colors";
import { ModeEditOutlined } from "@mui/icons-material";
import { Grid, Box, IconButton } from "@mui/material";
import { useStyles } from "../../styles/home/perfil";
import circleUser from "../../img/user.png";
import BodyData from "./perfil/BodyData";

function Perfil({name,lastname,address,dni}) {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      className={classes.root}
      sx={{ height: { md: "75vh" } }}
    >
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
      <Box>
        <BodyData classes={classes} name={name} lastname={lastname} address={address} dni={dni} />
      </Box>
    </Grid>
  );
}

export default Perfil;
