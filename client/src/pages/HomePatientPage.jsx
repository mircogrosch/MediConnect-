import React from "react";
import { teal } from "@mui/material/colors";
import { useStyles } from "../styles/home";
import { Box, Grid } from "@mui/material";
import SimpleAppBar from "../components/AppBar/SimpleAppBar";
import Perfil from "../components/Home/Perfil";
import AppBarIcons from "../components/Home/appbar/AppBarIcons";
import ShifsNotificator from "../components/Home/ShifsNotificator.jsx";
import ContainerCards from "../components/Home/ContainerCards.jsx";
import PrimarySearchAppBar from '../components/Notification/AppBarNoti.jsx'
function HomePatientPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <PrimarySearchAppBar />
      <Box className={classes.container}>
        {/* <SimpleAppBar background={teal[200]} content={<AppBarIcons />} /> */}
      
        <Grid container md={12} columnSpacing={4} justifyContent="center">
          <Grid item lg={3} md={4} xs={10}>
            <Perfil />
          </Grid>
          <Grid container item md={8} xs={11} flexDirection="column">
            <ShifsNotificator />
            <ContainerCards />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default HomePatientPage;
