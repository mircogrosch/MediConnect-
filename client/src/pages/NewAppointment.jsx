import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { teal } from "@mui/material/colors";
import PrimarySearchAppBar from "../components/Notification/AppBarNoti";
import SelectDoctor from "../components/newAppointment/SelectDoctor";
import SelectDate from "../components/newAppointment/SelectDate";
import ConfirmAppointment from "../components/newAppointment/ConfirmAppointment";

const steps = [
  "Selecionar Profesional",
  "Elegir Fecha y Hora",
  "Confirmar Turno",
];

const NewAppointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [doctorData, setDoctorData] = useState();
  const [dateSelected, setDateSelected] = useState("");

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SelectDoctor setDoctorData={setDoctorData} nextStep={nextStep} />
        );
      case 1:
        return (
          <SelectDate
            doctorData={doctorData}
            nextStep={nextStep}
            previousStep={previousStep}
            setDateSelected={setDateSelected}
          />
        );
      case 2:
        return (
          <ConfirmAppointment
            dateSelected={dateSelected}
            doctorData={doctorData}
            previousStep={previousStep}
          />
        );

      default:
        break;
    }
  };

  const nextStep = () => setActiveStep(activeStep + 1);

  const previousStep = () => setActiveStep(activeStep - 1);

  return (
    <Box>
      <PrimarySearchAppBar />
      <Box
        sx={{
          height: "90vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Stepper activeStep={activeStep} sx={{ marginY: "1em", width: "80vw" }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          <Box
            bgcolor={teal[100]}
            sx={{
              width: "80vw",
              height: "80vh",
              padding: "0.5em",
              borderRadius: "10px",
            }}
          >
            {getStepContent(activeStep)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default NewAppointment;
