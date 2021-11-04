import React from "react";
import { Box, Grid, Icon, Typography, IconButton } from "@material-ui/core";
import { AccountCircle, ControlPoint } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { socket } from "../Controlers/notifications";
import { teal } from "@mui/material/colors";
import swal from "sweetalert";

const CardAdd = ({
  name,
  lastname,
  address,
  specialities,
  sendNotification,
  idPatient,
  idDoctor,
  email,
}) => {
  let userLog = useSelector((state) => state.users.users);

  let docName = "Dr. " + name + " " + lastname;

  const handleClick = () => {
    let userReciver = {
      email: email,
      id: idDoctor,
    };
    sendNotification(userReciver, userLog, socket);
    swal({
      title: "Se envio la solicitud!",
      text: `Espere a que ${name} la acepte`,
      icon: "success",
      button: "Entendido",
    });
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
