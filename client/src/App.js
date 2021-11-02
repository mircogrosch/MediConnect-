import { Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./components/Login/Login";
import FormPacientCreate from "./components/FormPacientCreate/FormPacientCreate";
import FormProfesionalCreate from "./components/FormProfesionalCreate/FormProfesionalCreate";
import SelectorRegisterForm from "./pages/SelectorRegisterForm";
import HomePatientPage from "./pages/HomePatientPage";

function App() {
  return (
    <div>
      <Route path="/register/doctor" component={FormProfesionalCreate} />
      <Route path="/register/pacient" component={FormPacientCreate} />
      <Route path="/register/form" component={SelectorRegisterForm} />
      <Route path="/login" component={LoginPage} />
      <Route path="/account/patient" component={HomePatientPage} />
      <Route exact path="/" component={LandingPage} />
    </div>
  );
}

export default App;
