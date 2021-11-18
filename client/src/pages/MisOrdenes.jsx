import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import jwt from "jsonwebtoken";
import { PDFViewer } from "@react-pdf/renderer";
import OrdenPdf from "./OrdenPdf";

const MisOrdenes = () => {
  const [orders, setOrders] = useState([]);

  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  const getOrders = async (user) => {
    const response = await axios.get(
      `http://localhost:3001/patient/medicalorder?patientId=${user.rol.id}`
    );
    setOrders(response.data.data);
  };

  useEffect(() => {
    getOrders(user);
  }, []);
  console.log(orders);
  let infoPerson;
  let infoOrden;
  let date;
  return (
    <Grid>
      <PrimarySearchAppBar />
      <Grid>
        {orders.map((e) => {
          infoPerson = {
            name: e.patient.person.name,
            lastname: e.patient.person.lastname,
            dni: e.patient.personDni,
            healthInsurance: {
              name: e.patient.healthInsurance.name,
            },
          };
          infoOrden = {
            medical_studies: e.medical_studies,
            diagnostic: e.diagnostic,
          };
          date = new Date(e.date);
          return (
            <PDFViewer
              key={e.id}
              style={{ width: "400px", height: "650px", margin: "20px" }}
            >
              <OrdenPdf info={infoPerson} orden={infoOrden} date={date} />
            </PDFViewer>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default MisOrdenes;
