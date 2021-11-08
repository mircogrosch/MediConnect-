import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPatients, filterMyPatientsByName } from "../actions";
import { Box, Grid } from "@mui/material";
import { teal } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import SearchBar from "../components/SearchBar/SearchBar";
import PatientCard from "../components/MyPatients/PatientCard";

function MyPatientsPage(props) {
  const dispatch = useDispatch();

  const id = props.match.params.id;
  const myPatients = useSelector((state) => state.myPatients.myPatients);

  useEffect(() => {
    dispatch(getMyPatients(id));
  }, [dispatch, id]);

  return (
    <Box>
      <AppBar bgColor={teal[500]} />
      <Box
        sx={{
          height: "93vh",
          background: teal[100],
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "95vw",
            height: "85vh",
            background: teal[500],
            borderRadius: "12px",
          }}
        >
          <Grid container justifyContent="flex-end">
            <SearchBar
              id={id}
              filterName={filterMyPatientsByName}
              bgColor={teal[800]}
            />
          </Grid>
          {myPatients.length && (
            <Grid
              container
              rowSpacing={1}
              sx={{ height: "70vh", overflowY: "scroll" }}
            >
              {myPatients.map((patient) => {
                return (
                  <Grid
                    item
                    key={patient.id}
                    xl={4}
                    md={6}
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <PatientCard
                      name={patient.name}
                      lastname={patient.lastname}
                      email={patient.email}
                      dni={patient.dni}
                      address={patient.address}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyPatientsPage;
