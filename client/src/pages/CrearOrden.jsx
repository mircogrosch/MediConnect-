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
import { useDispatch, useSelector } from "react-redux";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import axios from "axios";
import OrdenPdf from "./OrdenPdf";
import { PDFViewer } from "@react-pdf/renderer";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { postOrder } from "../actions/index";

const CrearOrden = () => {
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const patients = useSelector((state) => state.myPatients);
  const [patient, setPatient] = useState("");
  const [infoPatient, setInfoPatient] = useState({});
  const [verPdf, setVerPdf] = useState(false);
  const [orden, setOrden] = useState({
    medical_studies: "",
    diagnostic: "",
  });

  const handleSelect = (e) => {
    setPatient(e.target.value);
    const getInfoPatient = async (e) => {
      const response = await axios.get(
        `http://localhost:3001/patient/${e.target.value}`
      );
      setInfoPatient(response.data.data);
    };
    getInfoPatient(e);
  };

  const handleChange = (e) => {
    setOrden({
      ...orden,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(postOrder(user.rol.id, infoPatient.id, orden));
    history.push("/account/profesional");
  };

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
            marginTop="20px"
            justifyContent="center"
          >
            <Typography variant="h2">Orden</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-evenly"
            marginTop="5px"
            marginBottom="20px"
          >
            <Button
              variant="contained"
              sx={{
                marginTop: "1em",
                fontSize: "16px",
                background: teal[700],
              }}
              onClick={handleSubmit}
            >
              Emitir orden
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "1em",
                fontSize: "16px",
                background: teal[700],
              }}
              onClick={() => {
                setVerPdf(!verPdf);
              }}
            >
              {verPdf ? "Cerrar Pdf" : "Ver PDF"}
            </Button>
          </Grid>
          {verPdf ? (
            infoPatient && (
              <PDFViewer style={{ width: "100vw", height: "100vh" }}>
                <OrdenPdf
                  info={infoPatient}
                  orden={orden}
                  date={new Date()}
                  firma={user.rol.signature}
                />
              </PDFViewer>
            )
          ) : (
            <Grid item display="flex" xs={12} justifyContent="center">
              <Grid item xs={10}>
                <InputLabel>Paciente</InputLabel>
                <Select
                  variant="standard"
                  defaultValue=""
                  value={patient}
                  onChange={(e) => handleSelect(e)}
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
                <Grid item sm={12} xs={12}>
                  <InputLabel>Nombre del Estudio</InputLabel>
                  <TextField
                    variant="standard"
                    value={orden.medical_studies}
                    sx={{
                      width: { sm: "100%", xs: "100%" },
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                    name="medical_studies"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <InputLabel>Diagnostico</InputLabel>
                  <TextField
                    variant="standard"
                    value={orden.diagnostic}
                    multiline
                    sx={{ width: { sm: "100%", xs: "100%" } }}
                    name="diagnostic"
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default CrearOrden;
