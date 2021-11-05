import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { maxWidth } from "@mui/system";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoctor } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";


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

const Card = ({ name, lastname, address, idPatient, idDoctor }) => {
  const dispatch = useDispatch();
  let myDoctors = useSelector((state) => state.myDoctors);
  myDoctors = myDoctors.names.data;

  console.log("myDoctors", myDoctors);
  const handleClick = () => {
    dispatch(deleteDoctor(idPatient, idDoctor));
  };

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
        <Box sx={{ marginBottom: "10px", maxWidth: "300px" }}>
          {/* <MyType2 variant='body'><b>Especialidad:</b> {specialities}</MyType2> */}
        </Box>
        <MyType2 variant="body">
          <b>Localidad:</b> {address}
        </MyType2>
      </MyBox3>
      <IconButton onClick={handleClick} aria-label="delete" size="small">
        <DeleteIcon fontSize="large" />
      </IconButton>
    </MyBox>
  );
};

export default Card;
