import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Grid, InputLabel, TextField, MenuItem, Button } from "@mui/material";

function AllergyForm({ patientId, doctorId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios.post(
      `http://localhost:3001/patient/allergy/${patientId}`,
      data
    );
    const response = await axios.get(
      `http://localhost:3001/patient/allergy/${patientId}`
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
          {...register("name", { required: true })}
        />
      </Grid>
      <Grid item xs={4} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Gravedad</InputLabel>
        <TextField
          variant="standard"
          select
          defaultValue=""
          error={errors.severity ? true : false}
          sx={{ width: "100%" }}
          {...register("severity", { required: true })}
        >
          <MenuItem value="1">Baja</MenuItem>
          <MenuItem value="2">Media</MenuItem>
          <MenuItem value="3">Alta</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Descripción</InputLabel>
        <TextField
          variant="outlined"
          multiline
          rows={4}
          error={errors.description ? true : false}
          sx={{ width: "100%" }}
          {...register("description", { required: true })}
        />
      </Grid>
      <Grid item xs={12} justifyContent="space-around" display="flex">
        <Button
          variant="contained"
          sx={{
            width: "40%",
            height: "50px",
            marginY: "1em",
          }}
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
          }}
        >
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
}

export default AllergyForm;
