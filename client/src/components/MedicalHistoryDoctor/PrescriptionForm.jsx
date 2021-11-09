import React from "react";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { Grid, InputLabel, TextField, MenuItem, Button } from "@mui/material";
import { teal } from "@mui/material/colors";

function PrescriptionForm({ patientId, doctorId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // await axios.post(
    //   `http://localhost:3001/patient/prescription_drug/${patientId}`,
    //   data
    // );
    // const response = await axios.get(
    //   `http://localhost:3001/patient/prescription_drug/${patientId}`
    // );
    // console.log(response.data);
  };

  return (
    <Grid container justifyContent="center" sx={{ marginBottom: "2em" }}>
      <Grid item xs={12} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Nombre</InputLabel>
        <TextField
          variant="standard"
          error={errors.name ? true : false}
          sx={{ width: "50%" }}
          {...register("name", { required: true })}
        />
      </Grid>
      <Grid item xs={12} marginY="1em">
        <InputLabel sx={{ marginLeft: "5px" }}>Indicaciones</InputLabel>
        <TextField
          variant="outlined"
          multiline
          rows={2}
          error={errors.posology ? true : false}
          sx={{ width: "100%" }}
          {...register("posology", { required: true })}
        >
          <MenuItem>Baja</MenuItem>
          <MenuItem>Media</MenuItem>
          <MenuItem>Alta</MenuItem>
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

export default PrescriptionForm;
