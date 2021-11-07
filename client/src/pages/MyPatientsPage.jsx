import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPatients, getHealthInsurances } from "../actions";
import { Box, Grid, InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import PatientCard from "../components/MyPatients/PatientCard";

function MyPatientsPage(props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const id = props.match.params.id;
  const myPatients = useSelector((state) => state.myPatients.myPatients);
  const healthInsurances = useSelector((state) => state.healthInsurances).names;

  useEffect(() => {
    !healthInsurances && dispatch(getHealthInsurances());
    dispatch(getMyPatients(id));
  }, [dispatch]);

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
            <InputBase
              variant="outlined"
              placeholder="Buscar"
              value={input}
              //   className={classes.searchBar}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                width: "25vw",
                height: "50px",
                margin: "15px",
                paddingLeft: "10px",
                background: teal[800],
                borderRadius: "5px",
              }}
              endAdornment={
                <IconButton>
                  <Search color="#bdbdbd" />
                </IconButton>
              }
            ></InputBase>
          </Grid>
          {myPatients ? (
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
          ) : (
            <div>
              <h1>NO HAY NADA</h1>
            </div>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MyPatientsPage;
