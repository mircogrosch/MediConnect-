import React from "react";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import logo from "../img/mediconnect-logo.png";

const OrdenPdf = ({ info, orden, date, firma }) => {
  return (
    <Document>
      <Page size="A5" style={{ display: "flex" }}>
        <Image
          src={logo}
          alt="MEDICONNECT+"
          style={{ width: "200px", marginLeft: "120px", marginTop: "10px" }}
        />
        <View>
          <Text
            style={{
              display: "flex",
              fontSize: "13px",
              marginLeft: "5px",
              marginTop: "10px",
            }}
          >
            Nombre y Apellido: {info ? `${info.name} ${info.lastname}` : null}
          </Text>
          <Text
            style={{ display: "flex", fontSize: "13px", marginLeft: "5px" }}
          >
            Obra Social: {info ? `${info.healthInsurance.name}` : null}
          </Text>
          <Text
            style={{ display: "flex", fontSize: "13px", marginLeft: "5px" }}
          >
            DNI: {info ? `${info.dni}` : null}
          </Text>
          <Text
            style={{
              display: "flex",
              fontSize: "20px",
              marginBottom: "10px",
              marginLeft: "10px",
              marginTop: "40px",
            }}
          >
            Estudio: {orden ? `${orden.medical_studies}` : null}
          </Text>
          <Text
            style={{
              display: "flex",
              fontSize: "20px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            Diagnostico: {orden ? `${orden.diagnostic}` : null}
          </Text>
          <View
            style={{
              display: "flex",
              marginLeft: "20px",
              justifyContent: "flex-end",
            }}
          >
            <Image
              src={firma}
              alt="firma del doctor"
              style={{ width: "80px", marginTop: "150px", marginLeft: "290px" }}
            />
            <Text
              style={{
                display: "flex",
                fontSize: "15px",
                marginTop: "-5px",
                marginLeft: "290px",
              }}
            >
              ------------------
            </Text>
            <Text
              style={{
                display: "flex",
                fontSize: "15px",
                marginTop: "10px",
                marginLeft: "290px",
              }}
            >
              Firma Doctor
            </Text>
          </View>
          <Text
            style={{ display: "flex", fontSize: "15px", marginTop: "10px" }}
          >
            Fecha:{" "}
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrdenPdf;
