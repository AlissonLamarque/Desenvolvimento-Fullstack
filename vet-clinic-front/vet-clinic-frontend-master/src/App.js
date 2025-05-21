import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/UserRegister';
import PetRegister from './components/PetRegister';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/usuarios/register" element={<Register />} />
        <Route path="/pets/petRegister" element={<PetRegister />} />
        <Route path="/usuarios/" element={<UserList />} />
        {/* Você pode adicionar mais rotas aqui */}
      </Routes>
    </div>
  );
}

export default App;
