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
import RecetaPdf from "./RecetaPdf";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import { postPrescription } from "../actions/index";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const CrearReceta = () => {
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.myPatients);
  const [patient, setPatient] = useState("");
  const [verPdf, setVerPdf] = useState(false);
  const [infoPatient, setInfoPatient] = useState({});
  const [receta, setReceta] = useState({
    medication: "",
    frequency: "",
    diagnostic: "",
    amount: "",
    how_much: "",
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
    setReceta({
      ...receta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(postPrescription(user.rol.id, infoPatient.id, receta));
    swal({
      title: "Se envio la receta!",
      text: `La receta se envio a ${infoPatient.name}`,
      icon: "success",
      button: "Entendido",
    });
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
            marginBottom="5px"
            marginTop="20px"
            justifyContent="center"
          >
            <Typography variant="h2">Receta</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-evenly"
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
              disabled={
                patient !== "" &&
                receta.medication !== "" &&
                receta.frequency !== "" &&
                receta.diagnostic !== "" &&
                receta.amount !== "" &&
                receta.how_much !== ""
                  ? false
                  : true
              }
            >
              Emitir Receta
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
              disabled={
                patient !== "" &&
                receta.medication !== "" &&
                receta.frequency !== "" &&
                receta.diagnostic !== "" &&
                receta.amount !== "" &&
                receta.how_much !== ""
                  ? false
                  : true
              }
            >
              {verPdf ? "Cerrar Pdf" : "Ver PDF"}
            </Button>
          </Grid>
          {verPdf ? (
            infoPatient && (
              <PDFViewer
                style={{
                  width: "100vw",
                  height: "100vh",
                  borderRadius: "15px",
                }}
              >
                <RecetaPdf
                  info={infoPatient}
                  receta={receta}
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
                <Grid item sm={12} display="flex" flexDirection="row">
                  <Grid item sm={6} xs={12}>
                    <InputLabel>Nombre del medicamento</InputLabel>
                    <TextField
                      variant="standard"
                      value={receta.medication}
                      sx={{
                        width: { sm: "90%", xs: "100%" },
                        marginBottom: "20px",
                        marginRight: "5px",
                      }}
                      name="medication"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <InputLabel>Se debe tomar cada</InputLabel>
                    <TextField
                      variant="standard"
                      value={receta.frequency}
                      type="number"
                      sx={{ width: { sm: "100%", xs: "100%" } }}
                      name="frequency"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={12} display="flex" flexDirection="row">
                  <Grid item sm={6} xs={12}>
                    <InputLabel>Peso del comprimido</InputLabel>
                    <TextField
                      variant="standard"
                      value={receta.amount}
                      sx={{
                        width: { sm: "90%", xs: "100%" },
                        marginBottom: "20px",
                        marginRight: "5px",
                      }}
                      name="amount"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <InputLabel>Duracion del tratamiento</InputLabel>
                    <TextField
                      value={receta.how_much}
                      variant="standard"
                      sx={{
                        width: { sm: "100%", xs: "100%" },
                        marginBottom: "20px",
                        marginRight: "5px",
                      }}
                      name="how_much"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <InputLabel>Diagnostico</InputLabel>
                  <TextField
                    variant="standard"
                    value={receta.diagnostic}
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

export default CrearReceta;
