const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssantii200@gmail.com',
    pass: 'contraseña',
  },
});

const enviarReporte = async (para, asunto, mensaje, archivo) => {
  const attachments = [];
  
  if (archivo) {
    attachments.push({
      filename: archivo.nombre,
      content: archivo.contenido,
      encoding: 'base64',
      contentType: archivo.tipo
    });
  }

  const mailOptions = {
    from: 'ssantii200@gmail.com',
    to: para,
    subject: asunto,
    html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
      <div style="background: #0e3e85; color: white; padding: 16px; text-align: center;">
        <h2 style="margin: 0; font-size: 18px; font-weight: 500;">NUEVO REPORTE</h2>
      </div>
      
      <div style="padding: 20px;">
        ${mensaje}
        
        <div style="margin-top: 24px; font-size: 12px; color: #757575; text-align: center; border-top: 1px solid #eeeeee; padding-top: 12px;">
          <p style="margin: 0;">Este es un mensaje automático. Por favor no responder directamente.</p>
          <p style="margin: 4px 0 0 0;">© ${new Date().getFullYear()} Sistema de Reportes</p>
        </div>
      </div>
    </div>`,
    text: `Nuevo Reporte\n\n${asunto}\n\n${mensaje.replace(/<[^>]*>?/gm, '')}`,
    attachments: attachments
  };

  return transporter.sendMail(mailOptions);
};

module.exports = enviarReporte;
