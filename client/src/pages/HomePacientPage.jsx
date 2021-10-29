import React from "react";
import { teal } from "@mui/material/colors";
import { useStyles } from "../styles/otroHome/index";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import Perfil from "../components/homeOtros/Perfil";
import AppBarIcons from "../components/homeOtros/AppBarIcons";

function HomePacientPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SimpleAppBar background={teal[200]} content={<AppBarIcons />} />
      <Perfil />
    </div>
  );
}

export default HomePacientPage;
