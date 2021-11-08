import { Box, Icon, Typography, Grid } from "@material-ui/core";
import React from "react";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { teal } from "@mui/material/colors";
import ButtonRemove from "./ButtonRemove";

const Card = ({
  name,
  lastname,
  address,
  idPatient,
  idDoctor,
  specialities,
  image,
}) => {
  let myDoctors = useSelector((state) => state.myDoctors);
  myDoctors = myDoctors.names.data;

  let docName = `Dr ${name} ${lastname}`;
  return (
    <Box
      bgcolor={teal[200]}
      width={"80%"}
      height={"130px"}
      sx={{ borderRadius: "5px", padding: "1em" }}
    >
      <Grid container style={{ height: "100%" }}>
        {image ? (
          <Grid item xs={3}>
            <img
              src={image}
              style={{
                maxWidth: "80px",
                maxHeight: "80px",
                minWidth: "80px",
                minHeight: "80px",
                borderRadius: "50%",
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={3}>
            <Icon
              style={{ width: "100%", height: "100%", textAlign: "center" }}
            >
              <AccountCircle style={{ fontSize: "80px", color: "#676767" }} />
            </Icon>
          </Grid>
        )}

        <Grid item xs={7}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "400",
              color: "#676767",
              marginBottom: "0.4em",
            }}
          >
            {docName}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#676767", marginBottom: "0.2em" }}
          >
            <strong>Especialidad:</strong> {specialities}
          </Typography>
          <Typography variant="body1" style={{ color: "#676767" }}>
            <strong>Ubicación:</strong> {address}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ButtonRemove idPatient={idPatient} idDoctor={idDoctor} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Card;
