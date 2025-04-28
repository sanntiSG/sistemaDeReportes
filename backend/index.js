const express = require('express');
const cors = require('cors');
const enviarReporte = require('./emailService');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.post('/api/enviar-reporte', async (req, res) => {
  const { departamento, mensaje, asunto, archivo } = req.body;

  const correos = {
    procesos: 'gmail.com',
    calidad: 'gmail.com',
    ventas: 'gmail.com',
  };

  try {
    const destinatario = correos[departamento];
    if (!destinatario) return res.status(400).send('Departamento no válido');

    await enviarReporte(destinatario, asunto, mensaje, archivo);
    res.send('Reporte enviado');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar el reporte');
  }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});