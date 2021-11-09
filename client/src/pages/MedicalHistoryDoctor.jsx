import React, { useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import AppBar from "../components/Notification/AppBarNoti";
import AllergyForm from "../components/MedicalHistoryDoctor/AllergyForm";
import PrescriptionForm from "../components/MedicalHistoryDoctor/PrescriptionForm";
import DiseaseForm from "../components/MedicalHistoryDoctor/DiseaseForm";

function MedicalHistoryDoctor(props) {
  const [displayed, setDisplayed] = useState({
    allergy: false,
    disease: false,
    prescription: false,
  });

  const query = new URLSearchParams(props.location.search);
  const patientId = query.get("patient");
  const doctorId = props.match.params.id;

  return (
    <Box>
      <AppBar bgColor={teal[900]} />
      <Grid container height="90vh" alignItems="center" justifyContent="center">
        <Box width="60vw">
          <Box
            bgcolor={teal[900]}
            sx={{
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              color={teal[50]}
              sx={{ borderRadius: "12px", flexGrow: 1 }}
            >
              Alergias
            </Typography>
            <IconButton
              onClick={() =>
                setDisplayed({
                  ...displayed,
                  allergy: !displayed.allergy,
                })
              }
            >
              {displayed.allergy ? (
                <ArrowDropDown sx={{ fontSize: "2em", color: teal[50] }} />
              ) : (
                <ArrowDropUp sx={{ fontSize: "2em", color: teal[50] }} />
              )}
            </IconButton>
          </Box>
          {displayed.allergy && (
            <AllergyForm patientId={patientId} doctorId={doctorId} />
          )}
        </Box>
        <Box width="60vw">
          <Box
            bgcolor={teal[900]}
            sx={{
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              color={teal[50]}
              sx={{ borderRadius: "12px", flexGrow: 1 }}
            >
              Enfermedad
            </Typography>
            <IconButton
              onClick={() =>
                setDisplayed({
                  ...displayed,
                  disease: !displayed.disease,
                })
              }
            >
              {displayed.disease ? (
                <ArrowDropDown sx={{ fontSize: "2em", color: teal[50] }} />
              ) : (
                <ArrowDropUp sx={{ fontSize: "2em", color: teal[50] }} />
              )}
            </IconButton>
          </Box>
          {displayed.disease && (
            <DiseaseForm patientId={patientId} doctorId={doctorId} />
          )}
        </Box>
        <Box width="60vw">
          <Box
            bgcolor={teal[900]}
            sx={{
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              color={teal[50]}
              sx={{ borderRadius: "12px", flexGrow: 1 }}
            >
              Prescripción
            </Typography>
            <IconButton
              onClick={() =>
                setDisplayed({
                  ...displayed,
                  prescription: !displayed.prescription,
                })
              }
            >
              {displayed.prescription ? (
                <ArrowDropDown sx={{ fontSize: "2em", color: teal[50] }} />
              ) : (
                <ArrowDropUp sx={{ fontSize: "2em", color: teal[50] }} />
              )}
            </IconButton>
          </Box>
          {displayed.prescription && (
            <PrescriptionForm patientId={patientId} doctorId={doctorId} />
          )}
        </Box>
      </Grid>
    </Box>
  );
}

export default MedicalHistoryDoctor;
