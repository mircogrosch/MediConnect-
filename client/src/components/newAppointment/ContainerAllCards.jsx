import React, { useEffect } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { Grid } from "@mui/material";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { getMyDoctors } from "../../actions/index";
import { teal } from "@mui/material/colors";
import { Link } from "react-router-dom";

function ContainerAllCards({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  let myDoctors = useSelector((state) => state.myDoctors.names); // Doctores asociados
  console.log("myDoctors", myDoctors);
  useEffect(() => {
    dispatch(getMyDoctors(props.match.params.id));
  }, []);

  return (
    <>
      {/* Doctores asociados */}
      <Grid
        container
        rowSpacing={2}
        className={classes.containerCards}
        sx={{ height: { sm: "70vh", xs: "65vh" } }}
      >
        {myDoctors &&
          myDoctors.map((e) => {
            return (
              <Grid
                // container
                item
                xl={4}
                md={6}
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "blue",
                }}
              >
                <Link
                  to={{
                    pathname:
                      "/account/patient/new-appointment/2/" +
                      props.match.params.id,
                    state: { data: e },
                  }}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Card
                    colorFont={"#676767"}
                    color={teal[200]}
                    key={e.id}
                    name={e.name}
                    lastname={e.lastname}
                    address={e.address}
                    email={e.email}
                    idPatient={props.match.params.id}
                    idDoctor={e.id}
                    image={e.imageProfile}
                    specialities={
                      e.specialities.length
                        ? e.specialities[0].name
                        : "CARDIOLOGIA"
                    }
                  />
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default ContainerAllCards;
