import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/UserRegister';
import PetRegister from './pages/PetRegister';
import UserList from './pages/UserList';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/usuarios/register" element={<Register />} />
          <Route path="/pets/petRegister" element={<PetRegister />} />
          <Route path="/usuarios/" element={<UserList />} />
        <Route element={<Layout />}>
        </Route>
        {/* Você pode adicionar mais rotas aqui */}
      </Routes>

      <h1>HOME</h1>
    </div>
  );
}

export default App;
