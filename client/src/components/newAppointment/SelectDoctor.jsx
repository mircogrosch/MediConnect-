import React from "react";
import {
  filterSpecialitiesMyDoctors,
  filterMyDoctorsByName,
} from "../../actions";
import { Box, Grid } from "@mui/material";
import { useStyles } from "../../styles/doctors/add_doctor";
import SearchBar from "../SearchBar/SearchBar";
import FiltroSelect from "../FiltroSelect/FiltroSelect";
import ContainerAllCards from "./Step1/ContainerAllCards";

function SelectDoctor({ setDoctorData, nextStep }) {
  const classes = useStyles();

  return (
    <Box>
      <Grid container justifyContent="space-between">
        <FiltroSelect
          filterSpecialities={filterSpecialitiesMyDoctors}
          styles={classes}
        />
        <SearchBar filterName={filterMyDoctorsByName} styles={classes} />
      </Grid>
      <Grid
        // height="70vh"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <ContainerAllCards setDoctorData={setDoctorData} nextStep={nextStep} />
      </Grid>
    </Box>
  );
}

export default SelectDoctor;
