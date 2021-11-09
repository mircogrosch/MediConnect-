import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Grid, InputLabel, TextField, MenuItem, Button } from "@mui/material";
import { teal } from "@mui/material/colors";

function DiseaseForm({ patientId, doctorId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post(
      `http://localhost:3001/patient/disease/${patientId}`,
      data
    );
    const response = await axios.get(
      `http://localhost:3001/patient/disease/${patientId}`
    );
    console.log(response.data);
  };

  return (
    <Grid container justifyContent="center" sx={{ marginBottom: "2em" }}>
      <Grid item xs={8} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Nombre</InputLabel>
        <TextField
          variant="standard"
          error={errors.name ? true : false}
          sx={{ width: "90%" }}
          {...register("name", { required: "true" })}
        />
      </Grid>
      <Grid item xs={4} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Fecha de Diagnóstico</InputLabel>
        <TextField
          variant="standard"
          defaultValue=""
          error={errors.diagnosis_date ? true : false}
          sx={{ width: "100%" }}
          {...register("diagnosis_date", { required: "true" })}
        />
      </Grid>
      <Grid item xs={12} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Descripción</InputLabel>
        <TextField
          variant="outlined"
          multiline
          rows={4}
          error={errors.description ? true : false}
          sx={{ width: "100%" }}
          {...register("description", { required: "true" })}
        />
      </Grid>
      <Grid item xs={12} justifyContent="space-around" display="flex">
        <Button
          variant="contained"
          sx={{ width: "40%", height: "50px", marginY: "1em" }}
        >
          Limpiar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          sx={{
            width: "40%",
            height: "50px",
            marginY: "1em",
            bgcolor: teal[900],
          }}
        >
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
}

export default DiseaseForm;
