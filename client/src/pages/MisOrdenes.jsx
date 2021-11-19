import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import jwt from "jsonwebtoken";
import { PDFViewer } from "@react-pdf/renderer";
import OrdenPdf from "./OrdenPdf";
import { grey } from "@mui/material/colors";

const MisOrdenes = () => {
  const [orders, setOrders] = useState([]);

  const user = jwt.verify(
    JSON.parse(sessionStorage.getItem("user"))?.token,
    "secret"
  );

  const getOrders = async (user) => {
    const response = await axios.get(
      `/patient/medicalorder?patientId=${user.rol.id}`
    );
    setOrders(response.data.data);
  };

  useEffect(() => {
    getOrders(user);
  }, [user]);

  let infoPerson;
  let infoOrden;
  let date;
  let firma;
  return (
    <Grid>
      <PrimarySearchAppBar />
      {orders.length === 0 ? (
        <Typography
          variant="h3"
          style={{ marginTop: "100px", marginLeft: "520px", color: grey[700] }}
        >
          No hay ordenes
        </Typography>
      ) : (
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
                <OrdenPdf
                  info={infoPerson}
                  orden={infoOrden}
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

export default MisOrdenes;
