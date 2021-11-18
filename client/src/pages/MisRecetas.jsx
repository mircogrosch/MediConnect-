import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import jwt from "jsonwebtoken";
import { PDFViewer } from "@react-pdf/renderer";
import RecetaPdf from "./RecetaPdf";
import { grey } from "@mui/material/colors";

const MisRecetas = () => {
  const [recipes, setRecipes] = useState([]);

  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  const getRecipies = async (user) => {
    const response = await axios.get(
      `http://localhost:3001/patient/prescription?patientId=${user.rol.id}`
    );
    setRecipes(response.data.data);
  };

  useEffect(() => {
    getRecipies(user);
  }, []);

  console.log(recipes);

  let infoPerson;
  let infoReceta;
  let date;
  let firma;
  return (
    <Grid>
      <PrimarySearchAppBar />
      {recipes.length === 0 ? (
        <Typography
          variant="h3"
          style={{ marginTop: "100px", marginLeft: "520px", color: grey[700] }}
        >
          No hay recetas
        </Typography>
      ) : (
        <Grid>
          {recipes.map((e) => {
            infoPerson = {
              name: e.patient.person.name,
              lastname: e.patient.person.lastname,
              dni: e.patient.personDni,
              healthInsurance: {
                name: e.patient.healthInsurance.name,
              },
            };
            infoReceta = {
              medication: e.medication,
              frequency: e.frequency,
              diagnostic: e.diagnostic,
            };
            date = new Date(e.date);
            firma = e.doctor.signature;
            return (
              <PDFViewer
                key={e.id}
                style={{
                  width: "400px",
                  height: "650px",
                  margin: "20px",
                  borderRadius: "15px",
                }}
              >
                <RecetaPdf
                  info={infoPerson}
                  receta={infoReceta}
                  date={date}
                  firma={firma}
                />
              </PDFViewer>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default MisRecetas;
