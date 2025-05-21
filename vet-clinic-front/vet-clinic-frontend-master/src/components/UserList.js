import React, { useEffect, useState } from "react";
import '../static/styles.css';

function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3001/usuarios");
        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setErro("Não foi possível carregar os usuários.");
        console.error(err);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="main-container">
      <h2>Lista de Usuários</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>Nome:</strong> {usuario.nome} <br />
            <strong>Email:</strong> {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
