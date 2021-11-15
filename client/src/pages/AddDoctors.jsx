import React from "react";
import { Grid, Box } from "@mui/material";
import { useStyles } from "../styles/doctors/add_doctor";
import SearchBar from "../components/SearchBar/SearchBar";
import FiltroSelect from "../components/FiltroSelect/FiltroSelect";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";
import ContainerCardAdd from "../components/AddDoctors/ContainerCardAdd";
import {
  filterDoctorsByName,
  filterSpecialitiesAllDoctors,
} from "../actions/index";

function AddDoctors(props) {
  const classes = useStyles();

  return (
    <Box>
      <PrimarySearchAppBar />
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Grid container justifyContent="space-between">
            <FiltroSelect
              filterSpecialities={filterSpecialitiesAllDoctors}
              styles={classes}
            />
            <SearchBar
              filterName={filterDoctorsByName}
              id={props.match.params.id}
              styles={classes}
            />
          </Grid>
          <ContainerCardAdd props={props} />
        </Box>
      </Box>
    </Box>
  );
}
export default AddDoctors;
