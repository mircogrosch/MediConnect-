import React from "react";
import { teal } from "@mui/material/colors";
import { Grid, Box } from "@mui/material";
import { useStyles } from "../../styles/home/perfil";
import circleUser from "../../img/user.png";
import BodyData from "./perfil/BodyData";

function Perfil({
  name,
  lastname,
  address,
  dni,
  color,
  bgColor,
  bgDarkColor,
  imagePerfil,
  location,
  email,
  enrollment,
  user
}) {
  const classes = useStyles();
  const locationFinish = user.rol==="Patient"? `${address}`:`${location}, ${address}`
  return (
    <Grid
      container
      item
      className={classes.root}
      sx={{ height: "100%", background: bgColor || teal[100] }}
    >
      <img
        src={imagePerfil || circleUser}
        alt="user profile"
        className={classes.circleUser}
      />
      <Box sx={{ width: "100%" }}>
        <BodyData
          classes={classes}
          name={name}
          lastname={lastname}
          address={locationFinish}
          dni={dni}
          email={email}
          enrollment={enrollment}
          color={color}
          bgColor={bgDarkColor || teal[900]}
          user={user}
        />
      </Box>
    </Grid>
  );
}

export default Perfil;
