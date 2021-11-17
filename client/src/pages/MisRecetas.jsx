import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import jwt from "jsonwebtoken";
import { PDFViewer } from "@react-pdf/renderer";
import RecetaPdf from "./RecetaPdf";

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

  // let infoPerson
  // let infoReceta
  // let date
  return (
    <Grid>
      <PrimarySearchAppBar />
      <Grid>
        {recipes.map((e) => {
          let infoPerson = {
            name: e.patient.person.name,
            lastneme: e.patient.person.lastname,
            dni: e.patient.personDni,
          };
          let infoReceta = {
            medication: e.medication,
            frequency: e.frequency,
          };
          let date = e.date;
          return (
            <PDFViewer>
              <RecetaPdf info={infoPerson} receta={infoReceta} date={date} />
            </PDFViewer>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MisRecetas;
