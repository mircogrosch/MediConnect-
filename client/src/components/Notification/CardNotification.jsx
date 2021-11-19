import { AccountCircle } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { Check, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  postMyDoctor,
  deleteNotifications,
  rejectNotification,
} from "../../actions";

const MyGrid = styled(Grid)({
  display: "flex",
  width: "440px",
  height: "50px",
  marginBottom: "10px",
});
const MyIcon = styled(AccountCircle)({
  width: "50px",
  height: "50px",
});

function CardNotification({ msg, idDoctor, idPatient, id }) {
  const dispatch = useDispatch();
  const handleAcept = (idPatient, idDoctor, e) => {
    dispatch(postMyDoctor(idPatient, idDoctor));
    dispatch(deleteNotifications(id));
  };
  const handleReject = (idPatient) => {
    dispatch(rejectNotification(idPatient));
    dispatch(deleteNotifications(id));
  };
  const mensaje = msg.split(" ");
  return (
    <MyGrid>
      <MyIcon />
      <Grid>
        <Typography variant="h6">{mensaje[0]}</Typography>
        <Typography variant="body">{mensaje.slice(1).join(" ")}</Typography>
      </Grid>
      <IconButton
        sx={{ marginLeft: "20px" }}
        onClick={(e) => handleAcept(idPatient, idDoctor, e)}
      >
        <Check />
      </IconButton>
      <IconButton onClick={(e) => handleReject(idPatient, id)}>
        <Close />
      </IconButton>
    </MyGrid>
  );
}

export default CardNotification;
