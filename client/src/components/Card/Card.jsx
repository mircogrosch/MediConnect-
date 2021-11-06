import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";

import ButtonRemove from "./ButtonRemove";

const MyIcon = styled(Icon)({
  display: "contents",
});

const MyType = styled(Typography)({
  display: "inline",
  maxWidth: "290px",
});

const MyType2 = styled(Typography)({
  display: "inline",
  maxWidth: "300px",
});

const MyBox = styled(Box)({
  display: "inline-flex",
  flexDirection: "column",
  width: "450px",
  height: "180px",
  margin: "30px",
  borderRadius: "10px",
});

const MyBox2 = styled(Box)({
  color: "black",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  width: "500px",
  height: "200px",
  borderRadius: "10px",
});

const MyBox3 = styled(Box)({
  color: "#525752",
  display: "inline-flex",
  fontSize: "20px",
  flexDirection: "column",
  marginLeft: "120px",
  marginTop: "-20px",
  width: "500px",
  height: "200px",
  borderRadius: "10px",
});

const MyProfile = styled(AccountCircle)({
  width: "90px",
  height: "90px",
  margin: "10px",
});

const Card = ({
  name,
  lastname,
  address,
  idPatient,
  idDoctor,
  specialities,
}) => {
  let myDoctors = useSelector((state) => state.myDoctors);
  myDoctors = myDoctors.names.data;

  let docName = `Dr ${name} ${lastname}`;
  return (
    <MyBox sx={{ backgroundColor: "#80cbc4" }}>
      <MyBox2>
        <MyIcon sx={{ color: "#676767" }}>
          <MyProfile />
        </MyIcon>
        <MyType variant="h4" sx={{ color: "#676767" }}>
          {docName}
        </MyType>
      </MyBox2>
      <MyBox3>
        <Box sx={{ marginBottom: "10px", maxWidth: "300px" }}></Box>
        <MyType2 variant="body">
          <b>Localidad:</b> {address}
        </MyType2>
        <strong>Especialidad:</strong> {specialities}
      </MyBox3>
      <ButtonRemove idPatient={idPatient} idDoctor={idDoctor} />
    </MyBox>
  );
};

export default Card;
