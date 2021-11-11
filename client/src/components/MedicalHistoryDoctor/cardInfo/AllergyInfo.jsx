import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { teal, grey } from "@mui/material/colors";

function AllergyInfo({ setDisplayed, patientId }) {
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    getAllegies(patientId);
  }, [patientId]);

  const getAllegies = async (patientId) => {
    const response = await axios.get(
      `http://localhost:3001/patient/allergy/${patientId}`
    );
    setAllergies(response.data.data);
  };

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      {allergies.length > 0 && (
        <Box sx={{ height: "45vh", overflowY: "scroll" }}>
          {allergies.map((allergy) => (
            <Box key={allergy.id}>
              <Typography variant="h6" color={grey[800]}>
                {allergy.name}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Gravedad:</strong> {allergy.severity}
              </Typography>
              <Typography variant="body1" marginLeft="0.5em" color={grey[600]}>
                <strong>Descripción:</strong> {allergy.description}
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
            allergy: true,
          }))
        }
        sx={{
          width: "100%",
          bgcolor: teal[900],
          position: allergies.length > 0 ? "sticky" : "absolute",
          bottom: "10px",
        }}
      >
        Agregar Alergia
      </Button>
    </Box>
  );
}

export default AllergyInfo;
