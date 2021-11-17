import React from "react";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import logo from "../img/mediconnect-logo.png";

const RecetaPdf = ({ info, receta, date }) => {
  return (
    <Document>
      <Page size="A5" style={{ display: "flex" }}>
        <img src={logo} alt="MEDICONNECT+" style={{ width: "200px" }} />
        <Image src={logo} alt="MEDICONNECT+" style={{ width: "200px" }} />
        <View>
          <Text style={{ display: "flex", fontSize: "15px" }}>
            Nombre y Apellido: {info ? `${info.name} ${info.lastname}` : null}
          </Text>
          <Text style={{ display: "flex", fontSize: "15px" }}>
            Obra Social: {info ? `${info.healthInsurance.name}` : null}
          </Text>
          <Text style={{ display: "flex", fontSize: "15px" }}>
            DNI: {info ? `${info.dni}` : null}
          </Text>
          <Text
            style={{
              display: "flex",
              fontSize: "20px",
              marginTop: "40px",
              marginBottom: "10px",
            }}
          >
            Diagnostico: {receta ? `${receta.diagnostic}` : null}
          </Text>
          <Text
            style={{ display: "flex", fontSize: "20px", marginBottom: "10px" }}
          >
            Medicamento: {receta ? `${receta.medicineName}` : null}
          </Text>
          <Text
            style={{ display: "flex", fontSize: "20px", marginBottom: "10px" }}
          >
            Frecuencia: {receta ? `Cada ${receta.frecuency}hs` : null}
          </Text>
          <Text
            style={{ display: "flex", fontSize: "15px", marginTop: "280px" }}
          >
            Fecha:{" "}
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default RecetaPdf;