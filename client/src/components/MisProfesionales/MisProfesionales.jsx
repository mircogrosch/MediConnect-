import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import FiltroSelect from "../FiltroSelect/FiltroSelect";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
  filterSpecialitiesMyDoctors,
  filterMyDoctorsByName,
} from "../../actions";
import ConteinerCard from "./ConteinerCard";
import { useStyles } from "../../styles/doctors/add_doctor";
import PrimarySearchAppBar from "../../components/Notification/AppBarNoti"; 
import { useSelector } from "react-redux";
import { filterMyDoctorsByName } from "../../actions";
import { Link } from "react-router-dom";

const MyGrid = styled(Grid)({
  display: "flex",
  marginTop: "70px",
});

const MisProfesionales = (props) => {
  let MyDoctors = useSelector((state) => state.myDoctors.names); // Guarda doctores asociados para renderizar en las cards
const classes = useStyles();

  return (
    <Box>
      <PrimarySearchAppBar />
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Grid container justifyContent="space-between">
            <FiltroSelect
              filterSpecialities={filterSpecialitiesMyDoctors}
              styles={classes}
            />
            <SearchBar
              filterName={filterMyDoctorsByName}
              idPatient={props.match.params.id}
              styles={classes}
            />
          </Grid>
          <ConteinerCard props={props} />
        </Box>
      </Box>
    </Box>
  );
};

export default MisProfesionales;
