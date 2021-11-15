import { Box, Icon, Typography, Grid } from "@material-ui/core";
import React from "react";
import { AccountCircle } from "@mui/icons-material";
import ButtonFoward from "./ButtonFoward";

const Card = ({
  colorFont,
  color,
  key,
  name,
  lastname,
  address,
  email,
  idPatient,
  idDoctor,
  image,
  specialities,
}) => {
  let docName = `Dr ${name} ${lastname}`;
  return (
    <Box
      bgcolor={color}
      width={"80%"}
      height={"130px"}
      sx={{ borderRadius: "5px", padding: "1em" }}
    >
      <Grid container style={{ height: "100%" }}>
        {image ? (
          <Grid item xs={3}>
            <img
              alt="notfound"
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
              <AccountCircle style={{ fontSize: "80px", color: colorFont }} />
            </Icon>
          </Grid>
        )}

        <Grid item xs={7}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "400",
              color: colorFont,
              marginBottom: "0.4em",
            }}
          >
            {docName}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: colorFont, marginBottom: "0.2em" }}
          >
            <strong>Especialidad:</strong> {specialities}
          </Typography>
          <Typography variant="body1" style={{ color: colorFont }}>
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
          <ButtonFoward
            obj={{ name, lastname, idDoctor, idPatient, image, specialities }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Card;
