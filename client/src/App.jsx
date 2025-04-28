// src/App.js
import React, { useState } from 'react';
import gilera from './assets/gilera.png';

import ReportForm from './components/ReportForm';
import Login from './components/Login';
import Animation from './components/Animation';

const App = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const enviarReporte = async (data) => {
    await fetch('http://192.168.0.82:3001/api/enviar-reporte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Reporte enviado');
  };

  const handleLogin = () => {
    setShowAnimation(true); // 🔁 Mostrar animación
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    setAutenticado(true);
    setMostrarFormulario(true); // Solo después de animación
  };

  return (
    <div>
      <h1
        style={{
          color: '#2c5282',
          fontSize: '2rem',
          textAlign: 'center',
          marginTop: '2rem',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          fontWeight: '600',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)'
        }}
      >
        Sistema de Envío de Reportes
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <img src={gilera} alt="Logo Gilera" style={{ width: '6rem', height: 'auto' }} />
      </div>

      {/* 🔀 Pantalla de animación */}
      <Animation isVisible={showAnimation} onComplete={handleAnimationComplete} />

      {/* 🔐 Mostrar login o formulario */}
      {!autenticado && <Login onLogin={handleLogin} />}
      {mostrarFormulario && <ReportForm className="ml-8" onSubmit={enviarReporte} />}
    </div>
  );
};

export default App;
