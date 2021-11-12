import { Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./components/Login/Login";
import PatientRegisterForm from "./pages/PatientRegisterForm";
import DoctorRegisterForm from "./pages/DoctorRegisterForm";
import SelectorRegisterForm from "./pages/SelectorRegisterForm";
import HomePatientPage from "./pages/HomePatientPage";
import MisProfesionales from "./components/MisProfesionales/MisProfesionales";
import AddDoctors from "./pages/AddDoctors";
import HomePageDoctor from "./pages/HomePageDoctor";
import MensajesPaciente from "./pages/MenssagesPatients";
import PruebaChat from "./components/PruebaChat.jsx";
import MensajesDoctor from "./pages/MenssagesDoctor";
import MyPatientsPage from "./pages/MyPatientsPage";
import MedicalHistoryDoctor from "./pages/MedicalHistoryDoctor";
import MyPatientsHistory from "./components/MedicalHistoryDoctor/MyPatientsHistory";
import ScheduleDoctor from "./pages/ScheduleDoctor";
import MedicalHistoryPatient from "./pages/MedicalHistoryPatient";

function App() {
  return (
    <div>
      <Route path="/register/doctor" component={DoctorRegisterForm} />
      <Route path="/register/patient" component={PatientRegisterForm} />
      <Route path="/register/form" component={SelectorRegisterForm} />
      <Route path="/login" component={LoginPage} />
      <Route path="/account/profesionales/:id" component={MisProfesionales} />
      <Route path="/account/doctor/patients/:id" component={MyPatientsPage} />
      <Route exact path="/account/profesional" component={HomePageDoctor} />
      <Route exact path="/account/patient" component={HomePatientPage} />
      <Route path="/account/doctors/:id" component={AddDoctors} />
      <Route path="/account/schedule/:id" component={ScheduleDoctor} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/mensajes/paciente" component={MensajesPaciente} />
      <Route path="/mensajes/profesional" component={MensajesDoctor} />
      <Route
        path="/doctor/patients/medical-historial/:id"
        component={MyPatientsHistory}
      />
      <Route
        path="/account/patient/medical-history/:id"
        component={MedicalHistoryPatient}
      />
      <Route
        path="/doctor/medical-history/:id"
        component={MedicalHistoryDoctor}
      />
    </div>
  );
}

export default App;
