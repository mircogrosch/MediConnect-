import './App.css';
import { Route } from 'react-router';
import FormPacientCreate from './components/FormPacientCreate/FormPacientCreate';

function App() {
  return (
    <div>
      <Route path='/register/pacient' component={FormPacientCreate}/>
    </div>
  );
}

export default App;
