import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";

const CrearReceta = () => {
  const patients = useSelector((state) => state.myPatients);
  const [patient, setPatient] = useState("");

  return (
    <Grid>
      <PrimarySearchAppBar bgColor={teal[500]} color={teal[50]} />
      <Box
        sx={{ width: { lg: "60vw", md: "70vw", xs: "90vw" }, margin: "auto" }}
      >
        <Grid container rowSpacing={1}>
          <Grid
            item
            display="flex"
            xs={12}
            textAlign="center"
            marginBottom="20px"
            marginTop="20px"
            justifyContent="center"
          >
            <Typography variant="h2">Receta</Typography>
          </Grid>
          <Grid item display="flex" xs={12} justifyContent="center">
            <Grid item xs={10}>
              <InputLabel>Paciente</InputLabel>
              <Select
                variant="standard"
                defaultValue=""
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                sx={{ width: "100%", marginBottom: "20px" }}
              >
                {patients.names.map((a) => {
                  return (
                    <MenuItem key={a.id} value={a.id}>
                      {a.name} {a.lastname}
                    </MenuItem>
                  );
                })}
              </Select>
              <Grid item sm={12} display="flex" flexDirection="row">
                <Grid item sm={6} xs={12}>
                  <InputLabel>Nombre del medicamento</InputLabel>
                  <TextField
                    variant="standard"
                    sx={{
                      width: { sm: "90%", xs: "100%" },
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <InputLabel>Se debe tomar cada</InputLabel>
                  <TextField
                    variant="standard"
                    type="number"
                    sx={{ width: { sm: "100%", xs: "100%" } }}
                  />
                </Grid>
              </Grid>
              <Grid item sm={12} xs={12}>
                <InputLabel>Diagnostico</InputLabel>
                <TextField
                  variant="standard"
                  multiline
                  sx={{ width: { sm: "100%", xs: "100%" } }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-evenly"
                marginTop="20px"
              >
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "1em",
                    fontSize: "16px",
                    background: teal[700],
                  }}
                >
                  Enviar a mail
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "1em",
                    fontSize: "16px",
                    background: teal[700],
                  }}
                >
                  Ver PDF
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "1em",
                    fontSize: "16px",
                    background: teal[700],
                  }}
                >
                  Descargar PDF
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default CrearReceta;
