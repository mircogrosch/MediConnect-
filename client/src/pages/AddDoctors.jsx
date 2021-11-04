import React from "react";
import { Grid, Box } from "@mui/material";
import { useStyles } from "../styles/doctors/add_doctor";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";
import FiltroSelect from "../components/FiltroSelect/FiltroSelect";
import SearchBar from "../components/SearchBar/SearchBar";
import ContainerCardAdd from "../components/AddDoctor/ContainerCardAdd";

function AddDoctors(props) {
  const classes = useStyles();

  return (
    <Box>
      <PrimarySearchAppBar />
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Grid container justifyContent="space-between">
            <FiltroSelect styles={classes} />
            <SearchBar styles={classes} />
          </Grid>
          <ContainerCardAdd props={props} />
        </Box>
      </Box>
    </Box>
  );
}
export default AddDoctors;
