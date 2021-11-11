import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

function DiseaseInfo({ setDisplayed, patientId }) {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    getDiseases(patientId);
  }, [patientId]);

  const getDiseases = async (patientId) => {
    const response = await axios.get(
      `http://localhost:3001/patient/disease/${patientId}`
    );
    setDiseases(response.data.data);
  };

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {diseases.length > 0 && (
        <Box sx={{ height: "45vh", overflowY: "scroll" }}>
          {diseases.map((disease) => (
            <Box key={disease.id}>
              <Typography variant="h6" color={grey[800]}>
                {disease.name}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Fecha del Diagnóstico:</strong> {disease.diagnosis_date}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Descripción:</strong> {disease.description}
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
            disease: true,
          }))
        }
        sx={{
          width: "100%",
          bgcolor: teal[900],
          position: diseases.length > 0 ? "sticky" : "absolute",
          bottom: "10px",
        }}
      >
        Agregar Enfermedad
      </Button>
    </Box>
  );
}

export default DiseaseInfo;
