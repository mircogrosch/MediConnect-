import React, { useState } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Box, Grid, Button } from "@mui/material";
import { useStyles } from "../styles/home";
import { teal } from "@mui/material/colors";
import Alergias from "../components/MedicalHistoryItems/Alergias";
import axios from "axios";

const botonInfo = [
  {
    title: "Mis Alergias",
  },
  {
    title: "Medicaciones",
  },
  {
    title: "Enfermedades",
  },
  {
    title: "Mis Estudios",
  },
];

function MedicalHistory(props) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const URL = "http://localhost:3001";

  async function getAllergy() {
    try {
      const { data } = await axios.get(
        `${URL}/patient/allergy/${props.match.params.id}`
      );
      return data;
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Box className={classes.root} sx={{ background: teal[50] }}>
      <PrimarySearchAppBar />
      <Grid
        container
        columnSpacing={2}
        rowSpacing={-5}
        sx={{ height: "95vh", marginX: "1em" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          container
          md={4}
          display="flex"
          justifyContent="space-evenly"
          flexDirection="column"
          alignItem="center"
          rowSpacing={3}
          style={{ height: "70vh" }}
        >
          <Grid item>
            <Button
              variant="contained"
              component="label"
              onClick={() => setVisible(true)}
              sx={{ background: teal[700] }}
            >
              {"Mis Alergias"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              sx={{ background: teal[700] }}
            >
              {"Medicaciones"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              sx={{ background: teal[700] }}
            >
              {"Enfermedades"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              sx={{ background: teal[700] }}
            >
              {"Mis Estudios"}
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          md={8}
          justifyContent="center"
          alignItems="center"
          style={{
            width: "80%",
            borderRadius: "20px",
            backgroundColor: teal[100],
            height: "80vh",
            display: visible ? "flex" : "none",
          }}
        >
          <Alergias getAllergy={getAllergy} />
        </Grid>
      </Grid>
    </Box>
  );
}
export default MedicalHistory;
