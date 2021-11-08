import React, { useEffect, useState } from "react";
import { useStyles } from "../../styles/doctors/add_doctor";
import { Grid } from "@mui/material";
import Card from "../Card/Card";
import AddProfesionals from "../Card/AddProfesionals";
import { useDispatch, useSelector } from "react-redux";
import { getMyDoctors } from "../../actions";
import { Link } from "react-router-dom";

function ContainerCard({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Estado auxiliar
  const [aux, setAux] = useState(0);
  let MyDoctors = useSelector((state) => state.myDoctors.names); // Guarda doctores asociados para renderizar en las cards

  useEffect(() => {
    // Dispara la accion para traer todos los doctores asociados al paciente
    dispatch(getMyDoctors(props.match.params.id));
  }, [dispatch, aux]);

  return (
    <Grid
      container
      rowSpacing={2}
      className={classes.containerCards}
      sx={{ height: { sm: "70vh", xs: "65vh" } }}
    >
      <Grid
        item
        xl={4}
        md={6}
        xs={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Link
          to={`/account/doctors/${props.match.params.id}`}
          style={{ textDecoration: "none", color: "#676767" }}
        >
          <AddProfesionals />
        </Link>
      </Grid>
      {MyDoctors &&
        MyDoctors.map((e) => {
          return (
            <Grid
              item
              xl={4}
              md={6}
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                key={e.id}
                name={e.name}
                lastname={e.lastname}
                address={e.address}
                email={e.email}
                idPatient={props.match.params.id}
                idDoctor={e.id}
                image={e.imageProfile}
                props={props}
                setAux={setAux}
                aux={aux}
                specialities={
                  e.specialities.length ? e.specialities[0].name : "CARDIOLOGIA"
                }
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ContainerCard;
