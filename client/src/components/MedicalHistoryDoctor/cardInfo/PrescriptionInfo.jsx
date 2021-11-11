import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

function PrescriptionInfo({ setDisplayed, patientId }) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    getPrescriptions(patientId);
  }, [patientId]);

  const getPrescriptions = async (patientId) => {
    const response = await axios.get(
      `http://localhost:3001/patient/prescription_drug/${patientId}`
    );
    setPrescriptions(response.data.data);
  };

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {prescriptions.length > 0 && (
        <Box sx={{ height: "45vh", overflowY: "scroll" }}>
          {prescriptions.map((prescription) => (
            <Box key={prescription.id}>
              <Typography variant="h6" color={grey[800]}>
                {prescription.name}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Indicaciones:</strong> {prescription.posology}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Descripción:</strong> {prescription.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      <Button
        variant="contained"
        onClick={() =>
          setDisplayed((state) => ({
            ...state,
            prescription: true,
          }))
        }
        sx={{
          width: "100%",
          bgcolor: teal[900],
          position: prescriptions.length > 0 ? "sticky" : "absolute",
          bottom: "10px",
        }}
      >
        Agregar Prescripción
      </Button>
    </Box>
  );
}

export default PrescriptionInfo;
