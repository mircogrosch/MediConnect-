import { Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./components/Login/Login";
import FormPacientCreate from "./components/FormPacientCreate/FormPacientCreate";
import SelectorRegisterForm from "./pages/SelectorRegisterForm";

function App() {
  return (
    <div>
      <Route path="/register/pacient" component={FormPacientCreate} />
      <Route path="/register/form" component={SelectorRegisterForm} />
      <Route path="/login" component={LoginPage} />
      <Route exact path="/" component={LandingPage} />
    </div>
  );
}

export default App;
