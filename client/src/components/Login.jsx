// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const usuarioCorrecto = 'admin';
    const contrasenaCorrecta = '1234';

    if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
      onLogin(); // 🔓 Notificar que se inició sesión
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem' }}
        />
        <br />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
          Ingresar
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default Login;
