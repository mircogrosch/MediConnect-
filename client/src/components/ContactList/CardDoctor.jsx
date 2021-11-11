import { AccountCircle } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getContact, getMessage, deleteNotificationChat } from "../../actions";
import jwt from "jsonwebtoken";

const MyGrid = styled(Grid)({
  display: "flex",
  width: "440px",
  height: "50px",
  marginBottom: "10px",
});
const MyIcon = styled(AccountCircle)({
  width: "60px",
  height: "60px",
  marginRight: "20px",
});

function CardDoctor({ name, lastname, email, rol, img, dni, id }) {
  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );
  const dispatch = useDispatch();
  let userName = `${name} ${lastname}`;
  const handleContact = () => {
    dispatch(getContact(email, rol));
    dispatch(deleteNotificationChat(user.user.dni));
    dispatch(getNotificationsMessage(user.user.dni))
    dispatch(getMessage(user.user.dni, dni));

  };

  const contactNoti = useSelector((state) => state.messages.notificationChat);
  return (
    <MyGrid onClick={(e) => handleContact(e)}>
      {img ? (
        <img
          src={img}
          style={{
            maxWidth: "60px",
            maxHeight: "60px",
            minWidth: "60px",
            minHeight: "60px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />
      ) : (
        <MyIcon />
      )}
      <Grid>
        <Typography variant="h6">{userName}</Typography>
        <Typography variant="body">Ingrese al chat con {userName}</Typography>
        {contactNoti.find((e) => e.idPatient === id) && (
          <Typography variant="body">1</Typography>
        )}
      </Grid>
    </MyGrid>
  );
}

export default CardDoctor;
