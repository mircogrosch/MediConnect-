import { Box, Icon, Typography, Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import {socket} from '../Controlers/notifications'
import swal from "sweetalert";
const MyIcon = styled(Icon)({
  display: "contents",
});

const MyBox = styled(Box)({
  display: "inline-flex",
  flexDirection: "column",
  width: "400px",
  height: "180px",
  margin: "30px",
  borderRadius: "10px",
});

const MyBox2 = styled(Box)({
  color: teal[50],
  display: "flex",
  alignItems: "center",
  width: "500px",
  height: "200px",
  borderRadius: "10px",
});

const MyBox3 = styled(Box)({
  color: teal[50],
  display: "inline-flex",
  fontSize: "20px",
  flexDirection: "column",
  marginLeft: "120px",
  marginTop: "-20px",
  width: "500px",
  height: "200px",
  borderRadius: "10px",
});

const MyTypography = styled(Typography)({
  maxWidth: "290px",
});

const MyProfile = styled(AccountCircle)({
  width: "90px",
  height: "90px",
  margin: "10px",
});

const CardAdd = ({
  name,
  lastname,
  address,
  specialities,
  sendNotification,
  idPatient,
  idDoctor,
  email
}) => {

  //Global state
  let userLog = useSelector((state) => state.users.users);
  
  const handleClick = () => {
    let userReciver ={ 
      email: email,
      id: idDoctor
    }
    sendNotification(userReciver,userLog,socket)
    swal({
      title: "Se envio la solicitud!",
      text: `Espera a que ${name} la acepte`,
      icon: "success",
      button: "Entendido",
    });
  };

  let docName = "Dr. " + name + " " + lastname;
  return (
    <MyBox sx={{ backgroundColor: teal[600] }}>
      <MyBox2>
        <MyIcon>
          <MyProfile />
        </MyIcon>
        <MyTypography variant="h4" style={{ fontSize: "1.7em" }}>
          {docName}
        </MyTypography>
      </MyBox2>
      <MyBox3>
        <Box sx={{ marginBottom: "10px", display: "flex" }}>
          <Typography
            variant="p"
            style={{ fontSize: "0.8em", maxWidth: "200px" }}
          >
            <b>Especialidad:</b> {specialities}
          </Typography>
        </Box>
        <Typography
          variant="p"
          style={{ fontSize: "0.8em", maxWidth: "200px" }}
        >
          <b>Direccion:</b> {address}
        </Typography>
      </MyBox3>
      <Button onClick={handleClick}>Agregar</Button>
    </MyBox>
  );
};

export default CardAdd;
