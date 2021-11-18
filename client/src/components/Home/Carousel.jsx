import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import { Typography, Button, Grid } from "@mui/material/";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { teal, grey } from "@mui/material/colors";
import {
  AccountBoxOutlined,
  EventAvailableOutlined,
} from "@mui/icons-material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const infoPatient = [
  {
    title: "Agrega profesionales a tu agenda para chatear y solicitar turnos",
    body: "Antes de solicitar un turno con un profesional específico, asegurate de haberlo agregado a tu lista de profesionales asociados. Esto se hace desde la sección MIS PROFESIONALES, Agregar nuevo profesional.",
    icon: <AccountBoxOutlined sx={{ fontSize: "6em", color: teal[900] }} />,
  },
  {
    title: "Agenda un turno con tu médico el día y a la hora que prefieras",
    body: "En la sección de MIS TURNOS podés filtrar por especialidad médica y elegir día y horario para agendar tu próximo turno con algún profesional de los que tengas asociados a vos.",
    icon: <EventAvailableOutlined sx={{ fontSize: "6em", color: teal[900] }} />,
  },
];

const infoDoctor = [
  {
    title:
      "Configurá días y horarios en los que vas a estar disponible para trabajar",
    body: "Para que un paciente pueda agendar un turno con vos, lo primero que debes hacer es configurar tu agenda. Esto se hace ingresando a la sección de MI AGENDA, configuración de agenda.",
    icon: <EventAvailableOutlined sx={{ fontSize: "6em", color: teal[900] }} />,
  },
  {
    title: "Agenda un turno con tu médico el día y a la hora que prefieras",
    body: "En la sección de MIS TURNOS podés filtrar por especialidad médica y elegir día y horario para agendar tu próximo turno con algún profesional de los que tengas asociados a vos.",
    icon: <EventAvailableOutlined sx={{ fontSize: "6em", color: teal[900] }} />,
  },
];

function Carousel({ rol }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps =
    rol.rol === "Doctor" ? infoDoctor.length : infoPatient.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            height: "35px",
            background: rol.rol === "Patient" ? teal[200] : teal[900],
            borderRadius: "8px 8px 0 0",
            color: rol.rol === "Patient" ? teal[900] : teal[50],
          }}
        >
          <Typography align="center" variant="h6">
            Consejos de uso
          </Typography>
        </Box>
      </Grid>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={9000}
        style={{ background: teal[100] }}
      >
        {rol.rol === "Doctor"
          ? infoDoctor.map((step, index) => (
              <div key={step.title}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Grid
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    paddingY="1em"
                  >
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        lineHeight="1.2em"
                        marginBottom="1em"
                        color={grey[800]}
                      >
                        {infoDoctor[activeStep].title}
                      </Typography>
                      <Typography
                        variant="body1"
                        textAlign="justify"
                        lineHeight="1.3em"
                        color={grey[600]}
                      >
                        {infoDoctor[activeStep].body}
                      </Typography>
                      {/* </Grid> */}
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        textAlign: "center",
                        color: teal[50],
                      }}
                    >
                      {infoDoctor[activeStep].icon}
                    </Grid>
                  </Grid>
                ) : null}
              </div>
            ))
          : infoPatient.map((step, index) => (
              <div key={step.title}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Grid
                    container
                    width="100%"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      lineHeight="1em"
                      variant="h6"
                      sx={{ padding: "10px", color: "#676767" }}
                    >
                      {infoPatient[activeStep].title}
                    </Typography>
                    <Grid
                      item
                      xs={6}
                      sx={{
                        padding: "5px",
                        marginLeft: "50px",
                        color: "#9B9B9B",
                        textAlign: "justify",
                      }}
                    >
                      <Typography variant="body1">
                        {infoPatient[activeStep].body}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        textAlign: "center",
                        color: teal[400],
                      }}
                    >
                      {infoPatient[activeStep].icon}
                    </Grid>
                  </Grid>
                ) : null}
              </div>
            ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ bgcolor: teal[100], borderRadius: "0 0 8px 8px" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Siguiente
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Atrás
          </Button>
        }
      />
    </Box>
  );
}

export default Carousel;
