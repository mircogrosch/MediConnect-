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
import Mensajes from "./pages/Mensajes";
import MyPatientsPage from "./pages/MyPatientsPage";

function App() {
  return (
    <div>
      <Route path="/register/doctor" component={DoctorRegisterForm} />
      <Route path="/register/patient" component={PatientRegisterForm} />
      <Route path="/register/form" component={SelectorRegisterForm} />
      <Route path="/login" component={LoginPage} />
      <Route path="/account/profesionales/:id" component={MisProfesionales} />
      <Route path="/account/profesional" component={HomePageDoctor} />
      <Route path="/account/patient" component={HomePatientPage} />
      <Route path="/account/doctors/:id" component={AddDoctors} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/mensajes" component={Mensajes} />
      <Route path="/prueba/doctor/my-patients/:id" component={MyPatientsPage} />
    </div>
  );
}

export default App;
