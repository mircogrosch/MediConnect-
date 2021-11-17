import React from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Grid, Box } from "@mui/material";
import ContainerAllCards from "../components/newAppointment/ContainerAllCards";
import {
  filterSpecialitiesMyDoctors,
  filterMyDoctorsByName,
} from "../actions/index";
import FiltroSelect from "../components/FiltroSelect/FiltroSelect";
import SearchBar from "../components/SearchBar/SearchBar";
import { useStyles } from "../styles/doctors/add_doctor";
import { teal } from "@mui/material/colors";
import { useParams } from "react-router-dom";

const NewAppointment = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <>
      <Box>
        <PrimarySearchAppBar />
        <Box className={classes.root}>
          <Box backgroundColor={teal[100]} sx={{ width: "80vw" }}>
            <Grid container justifyContent="space-between">
              <FiltroSelect
                filterSpecialities={filterSpecialitiesMyDoctors}
                styles={classes}
              />
              <SearchBar
                filterName={filterMyDoctorsByName}
                id={id}
                styles={classes}
              />
            </Grid>
            <Grid
              height="70vh"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ContainerAllCards props={props} />
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default NewAppointment;
