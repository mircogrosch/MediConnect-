import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, Icon, Typography, IconButton } from "@material-ui/core";
import { AccountCircle, ControlPoint } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

const CardAdd = ({
  name,
  lastname,
  address,
  specialities,
  post,
  idPatient,
  idDoctor,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let docName = "Dr. " + name + " " + lastname;

  const handleClick = () => {
    dispatch(post(idPatient, idDoctor));
    alert("Medico agregado exitosamente");
    history.push(`/account/prueba/${idPatient}`);
  };

  return (
    <Box
      bgcolor={teal[700]}
      marginBottom={1}
      sx={{
        borderRadius: "1em",
        width: "80%",
        height: "120px",
        padding: "0.5em",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Grid container>
        <Grid item justifyContent="center" xs={3}>
          <Icon style={{ width: "100%", height: "100%", textAlign: "center" }}>
            <AccountCircle style={{ color: teal[50], fontSize: "70px" }} />
          </Icon>
        </Grid>
        <Grid item xs={7}>
          <Typography
            variant="h2"
            style={{
              fontSize: "1.5em",
              fontWeight: "500",
              marginBottom: "0.5em",
              color: teal[50],
            }}
          >
            {docName}
          </Typography>
          <Typography
            variant="body1"
            style={{ marginBottom: "0.2em", color: teal[50] }}
          >
            <b>Especialidad:</b> {specialities}
          </Typography>
          <Typography variant="body1" style={{ color: teal[50] }}>
            <b>Direccion:</b> {address}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => handleClick()}>
            <ControlPoint style={{ color: teal[50], fontSize: "50px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardAdd;
