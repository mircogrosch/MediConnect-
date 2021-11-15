import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Grid, Icon, Typography, IconButton } from "@mui/material";
import { AccountCircle, ListAltOutlined } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

function PatientCard({
  id,
  idDoctor,
  name,
  lastname,
  address,
  email,
  dni,
  img,
  historial,
}) {
  const history = useHistory();
  const docName = `${name} ${lastname}`;

  return (
    <Box
      bgcolor={teal[800]}
      width={"80%"}
      height={"130px"}
      sx={{ borderRadius: "5px", padding: "1em" }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3}>
          {img ? (
            <img
              src={img}
              alt={`${name}_${dni}`}
              style={{
                maxWidth: "80px",
                maxHeight: "80px",
                minWidth: "80px",
                minHeight: "80px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <Icon
              style={{ width: "100%", height: "100%", textAlign: "center" }}
            >
              <AccountCircle style={{ fontSize: "80px", color: teal[50] }} />
            </Icon>
          )}
        </Grid>
        <Grid item xs={7}>
          <Typography
            variant="h5"
            style={{
              fontWeight: "400",
              color: teal[50],
              marginBottom: "0.4em",
            }}
          >
            {docName}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: teal[50], marginBottom: "0.2em" }}
          >
            <strong>Email:</strong> {email}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: teal[50], marginBottom: "0.2em" }}
          >
            <strong>DNI:</strong> {dni}
          </Typography>
          <Typography variant="body1" style={{ color: teal[50] }}>
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
          {historial && (
            <IconButton
              onClick={() =>
                history.push(
                  `/doctor/medical-history/${idDoctor}?patient=${id}`
                )
              }
            >
              <ListAltOutlined style={{ fontSize: "60px", color: teal[50] }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PatientCard;
