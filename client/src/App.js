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
import MensajesDoctor from "./pages/MenssagesDoctor";
import MyPatientsPage from "./pages/MyPatientsPage";
import MedicalHistoryDoctor from "./pages/MedicalHistoryDoctor";
import MyPatientsHistory from "./components/MedicalHistoryDoctor/MyPatientsHistory";
import ScheduleDoctor from "./pages/ScheduleDoctor";
import MedicalHistoryPatient from "./pages/MedicalHistoryPatient";
import AppointmentConfig from "./pages/AppointmentConfig";
import CrearReceta from "./pages/CrearReceta";
import CrearOrden from "./pages/CrearOrden";
import ConfirmAppointment from "./pages/ConfirmAppointment"
import SchedulePatient from "./pages/SchedulePatient";
import NewAppointment from "./pages/NewAppointment";
import NewAppoinmentStep2 from "./pages/NewAppoinmentStep2";

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
      <Route
        path="/account/appointment-config/:id"
        component={AppointmentConfig}
      />
      <Route
        exact
        path="/account/patient/new-appointment/:id"
        component={NewAppointment}
      />
      <Route
        path="/account/profesional/schedule/:id"
        component={ScheduleDoctor}
      />
      <Route path="/account/patient/schedule/:id" component={SchedulePatient} />
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
      <Route path='/doctor/recipes' component={CrearReceta}/>
      <Route path="/doctor/orders" component={CrearOrden}/>
      <Route path="/account/patient/new-appointment/3" component={ConfirmAppointment} />
      <Route
        path="/account/patient/new-appointment/2/:id"
        component={NewAppoinmentStep2}
      />
    </div>
  );
}

export default App;
