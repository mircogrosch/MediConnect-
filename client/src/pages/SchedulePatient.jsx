import React, { useState, useEffect } from "react";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import { Typography, Button, Grid, Box } from "@mui/material";
import { teal, grey } from "@mui/material/colors";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import { IntializeMP } from "../components/Controlers/mercadopago";

const SchedulePatient = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const URL = "http://localhost:3001";

  useEffect(() => {
    const getAppointments = async () => {
      const response = await axios.get(`${URL}/patient/appointment/${id}`);
      let refactor = response.data.data.map((e) => {
        return {
          fullname: e.doctor.person.name + " " + e.doctor.person.lastname,
          date: e.date,
          id_appointment: e.id,
          hour_long: e.hour_long,
          payment_status: e.payment_status,
        };
      });
      setData(refactor);
    };
    getAppointments();
  }, [id]);

  const handleDelete = (id_appointment) => {
    let filtered = [];
    swal("Vas a eliminar un turno ya agendado, ¿estás seguro? ", {
      dangerMode: true,
      buttons: { cancel: true, confirm: "Continuar" },
    })
      .then(
        (success) =>
          success && axios.delete(`${URL}/doctor/appointment/${id_appointment}`)
      )
      .then(
        (success) =>
          success &&
          (filtered = data.filter((e) => e.id_appointment !== id_appointment))
      )
      .then((success) => success && setData(filtered))
      .catch((error) => console.log("No se elimino el turno", error));
  };

  const handlePayment = (id_appointment, fullname) => {
    let obj = {
      idPayment: id_appointment,
      title: fullname,
      price: 1500,
      idPatient: id,
    };
    swal(`Vas a realizar un pago por $1500 a ${fullname}, ¿Estas de acuerdo?`, {
      dangerMode: false,
      buttons: { cancel: true, confirm: "Continuar" },
    })
      .then(
        (success) =>
          success &&
          axios.post(`${URL}/checkout`, obj, {
            withCredentials: true,
          })
      )
      .then((res) => IntializeMP(res.data))
      .catch((error) => console.log("Hubo un error en el pago", error));
  };

  const columnas = [
    { name: "Fecha", selector: (row) => row["date"] },
    { name: "Hora", selector: (row) => row["hour_long"], sortable: true },
    {
      name: "Profesional",
      selector: (row) => row["fullname"],
      sortable: true,
    },
    {
      name: "Estado de pago",
      selector: (row) => row["payment_status"],
      sortable: true,
    },
    {
      name: "",
      cell: (row) =>
        row.payment_status === "Pendiente" ? (
          <Button
            onClick={() => handlePayment(row.id_appointment, row.fullname)}
            variant="contained"
            sx={{
              margin: "0.5em",
              lineHeight: "1.2em",
              fontSize: "10px",
              width: "100%",
              height: "30px",
              background: teal[800],
            }}
          >
            Pagar consulta
          </Button>
        ) : (
          false
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "",
      cell: (row) => (
        <Button
          onClick={() => handleDelete(row.id_appointment)}
          variant="contained"
          sx={{
            margin: "0.5em",
            lineHeight: "1.2em",
            fontSize: "10px",
            width: "100%",
            height: "30px",
            background: teal[800],
          }}
        >
          Cancelar turno
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <Box sx={{ background: grey[50] }}>
        <PrimarySearchAppBar />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            height="70vh"
            rowSpacing={1}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              align={"center"}
              variant="h4"
              style={{ color: grey[700] }}
            >
              Lista de turnos
            </Typography>
            {data.length ? (
              <Grid
                style={{
                  marginTop: "1em",
                  width: "80%",
                  background: grey[100],
                  border: "solid 0.0005px ",
                  borderColor: teal[100],
                  fontFamily: "Roboto",
                }}
              >
                <DataTable
                  columns={columnas}
                  data={data}
                  title={""}
                  fixedHeader
                  fixedHeaderScrollHeight="300px"
                />
              </Grid>
            ) : (
              <Grid
                height="30vh"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  align={"center"}
                  variant="h6"
                  style={{ color: grey[700] }}
                >
                  No tiene ningún turno pendiente
                </Typography>
              </Grid>
            )}

            <Link
              to={`/account/patient/new-appointment/${id}`}
              style={{ textDecoration: "none", width: "80%" }}
            >
              <Button
                variant="contained"
                sx={{
                  marginTop: "1em",
                  fontSize: "14px",
                  width: "100%",
                  height: "50px",
                  background: teal[900],
                }}
              >
                Solicitar nuevo turno
              </Button>
            </Link>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default SchedulePatient;
