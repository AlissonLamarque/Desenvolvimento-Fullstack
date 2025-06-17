import './App.css';
import { Link, Routes, Route, Router } from 'react-router-dom';
import Clients from './Pages/Clients';
import Pets from './Pages/Pets';
import Appointments from './Pages/Appointments';
import ClientForm from './Forms/ClientForm';
import PetForm from './Forms/PetForm';
import AppointmentForm from './Forms/AppointmentForm';
 

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/clients">Clients List</Link>
            </li>
            <li>
              <Link to="/pets">Pets List</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments List</Link>
            </li>
            <li>
              <Link to="/add-client">Add Client</Link>
            </li>
            <li>
              <Link to="/add-pet">Add Pet</Link>
            </li>
            <li>
              <Link to="/add-appointment">Add Appointment</Link>
            </li>
            {/* Add links for adding/editing forms later if desired */}
          </ul>
        </nav>

        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-client" element={<ClientForm />} />
          <Route path="/add-pet" element={<PetForm />} />
          <Route path="/add-appointment" element={<AppointmentForm />} />
          {/* Add a default route or homepage component */}
          <Route path="/" element={<h2>Welcome to the Vet Clinic App!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
