import React from "react";
import { teal } from "@mui/material/colors";
import { useStyles } from "../styles/otroHome/index";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import Perfil from "../components/homeOtros/Perfil";
import AppBarIcons from "../components/homeOtros/AppBarIcons";
import ShifsNotificator from "../components/Home/Notificator/ShifsNotificator.jsx";
import { Grid } from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import ContainerCards from '../components/Home/Cards/ContainerCards.jsx'
const array = [
  { title: "Mis Profesionales", icon: <AccountBox sx={{ fontSize: 50 }} /> },
];
function HomePacientPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container md={12} columnSpacing={4}>
        <SimpleAppBar background={teal[200]} content={<AppBarIcons />} />
        <Grid item md={4}>
          <Perfil />
        </Grid>
        <Grid item md={8}>
          <ShifsNotificator />
          <ContainerCards cardInfo={array}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePacientPage;
