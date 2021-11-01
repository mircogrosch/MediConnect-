import { Box, Icon, Typography } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import {teal } from "@mui/material/colors";
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

const MyProfile = styled(AccountCircle)({
  width: "90px",
  height: "90px",
  margin: "10px",
});

const CardAdd= () => {
  return (
    <MyBox sx={{ backgroundColor: teal[600] }}>
      <MyBox2>
        <MyIcon>
          <MyProfile />
        </MyIcon>
        <Typography variant="h4" style={{fontSize:"1.8em"}}>
          <b>Dr</b> nombreDelDoctor
        </Typography>
      </MyBox2>
      <MyBox3>
        <Box sx={{ marginBottom: "10px",display:"flex" }}>
        <Typography variant="p" style={{fontSize:"0.8em"}}>
          <b>Especialidad:</b> Ginecologo
        </Typography>
        </Box>
        <Typography variant="p" style={{fontSize:"0.8em"}}>
            <b>Direccion:</b> Calle Falsa 123
          </Typography>
      </MyBox3>

    </MyBox>
  );
};

export default CardAdd;