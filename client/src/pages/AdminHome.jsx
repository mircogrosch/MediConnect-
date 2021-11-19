import React from "react";
import { Grid } from "@material-ui/core";
import { Box } from "@mui/system";
import { AccountBoxOutlined } from "@mui/icons-material";
import { teal } from "@material-ui/core/colors";
import Card from "../components/Home/cards/Card";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti.jsx";
import { Link } from "react-router-dom";

function AdminHome() {
  let icon = <AccountBoxOutlined sx={{ fontSize: 40 }} />;
  return (
    <Grid>
      {/* <PrimarySearchAppBar bgColor={teal[900]} color={teal[900]} /> */}
      <Box
        sx={{ marginTop: { md: "2em" } }}
        style={{ backgroundColor: teal[50] }}
        padding="80px"
        marginLeft="80px"
        marginRight="80px"
        borderRadius="15px"
      >
        <Grid
          container
          columnSpacing={3}
          rowSpacing={4}
          justifyContent="center"
        >
          <Grid item md={4} sm={4} xs={5}>
            <Link to={`/admin/patients`} style={{ textDecoration: "none" }}>
              <Card
                title="Pacientes"
                icon={icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          </Grid>
          <Grid>
            <Link to={`/admin/doctors`} style={{ textDecoration: "none" }}>
              <Card
                title="Doctores"
                icon={icon}
                bgColor={teal[900]}
                color={teal[50]}
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default AdminHome;
