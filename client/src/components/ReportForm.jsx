import React, { useState, useRef } from 'react';

const ReportForm = ({ onSubmit }) => {
  const [departamento, setDepartamento] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tituloReporte, setTituloReporte] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [archivo, setArchivo] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setArchivo(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setArchivo({
        nombre: file.name,
        contenido: reader.result.split(',')[1],
        tipo: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departamento || !mensaje || !tituloReporte || !prioridad) {
      alert('Por favor complete todos los campos');
      return;
    }

    const asunto = `[${prioridad === 'A' ? 'Alta' : prioridad === 'B' ? 'Media' : 'Baja'}] ${tituloReporte}`;

    const mensajeFormateado = 
      `<div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <div style="margin-bottom: 16px;">
          <p style="margin: 0 0 4px 0; font-size: 14px;"><strong style="color: #0e3e85;">Departamento:</strong> ${departamento}</p>
          <p style="margin: 0; font-size: 14px;">
            <strong style="color: #0e3e85;">Prioridad:</strong> 
            <span style="color: ${prioridad === 'A' ? '#D32F2F' : prioridad === 'B' ? '#FFA000' : '#388E3C'}; font-weight: 600;">
              ${prioridad === 'A' ? 'Alta' : prioridad === 'B' ? 'Media' : 'Baja'}
            </span>
          </p>
        </div>
        <div style="background-color: #f8f9fa; border-left: 4px solid #0e3e85; padding: 12px; margin: 12px 0;">
          <p style="margin: 0 0 6px 0; font-size: 14px; color: #0e3e85; font-weight: 600;">Detalles del reporte:</p>
          <div style="font-size: 14px; white-space: pre-wrap;">${mensaje}</div>
        </div>
      </div>`;

    onSubmit({
      departamento,
      mensaje: mensajeFormateado,
      asunto,
      prioridad,
      archivo,
    });

    // Reiniciar formulario
    setDepartamento('');
    setMensaje('');
    setTituloReporte('');
    setPrioridad('');
    setArchivo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-header">
          <h2 className="form-title">Sistema de Reportes</h2>
          <p className="form-subtitle">Complete los detalles del reporte</p>
        </div>

        <div className="form-body">
          <div className="form-group">
            <label htmlFor="titulo" className="form-label">Título del Reporte</label>
            <input
              id="titulo"
              type="text"
              placeholder="Ingrese el título del reporte"
              value={tituloReporte}
              onChange={(e) => setTituloReporte(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prioridad</label>
            <div className="priority-options">
              {['A', 'B', 'C'].map((nivel, i) => {
                const prioridadNombre = ['Alta', 'Media', 'Baja'][i];
                const descripcion = ['Muy importante', 'Importante', 'Menos importante'][i];
                const clase = ['priority-high', 'priority-medium', 'priority-low'][i];
                return (
                  <label className="priority-option" key={nivel}>
                    <input
                      type="radio"
                      name="prioridad"
                      value={nivel}
                      checked={prioridad === nivel}
                      onChange={() => setPrioridad(nivel)}
                      required
                    />
                    <span className={`priority-tag ${clase}`}>
                      <span className="priority-level">{prioridadNombre}</span>
                      <span className="priority-description">({descripcion})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="departamento" className="form-label">Departamento</label>
            <select
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Seleccione departamento</option>
              <option value="procesos">Procesos</option>
              <option value="calidad">Calidad</option>
              <option value="ventas">Ventas</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje" className="form-label">Detalles del Reporte</label>
            <textarea
              id="mensaje"
              placeholder={`FECHA:\nHORA:\nNº DE VIN:\nDESCRIPCIÓN:\n`}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="form-textarea"
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="archivo" className="form-label">Adjuntar Archivo (no mas de 20mb).</label>
            <input
              type="file"
              id="archivo"
              onChange={handleFileChange}
              className="form-input"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              ref={fileInputRef}
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">
            <span>Enviar Reporte</span>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;