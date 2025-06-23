// utils/mailer.js
import nodemailer from 'nodemailer';
import { config } from "../config.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const link = `http://localhost:3001/api/clients/verify-email?token=${token}`;
  console.log(`📧 Enviando email a: ${email}`);
  console.log(`🔗 Enlace de verificación: ${link}`);

  try {
await transporter.sendMail({
  from: config.email.email_user,
  to: email,
  subject: 'Verify your Virtual Angel account',
  html: `
  <div style="font-family: 'Poppins', sans-serif; background-color: #111; color: #fff; padding: 30px; text-align: center;">
    <div style="max-width: 500px; margin: auto; border: 2px solid #ff0000; border-radius: 12px; padding: 40px; background-color: #000000;">
      <h1 style="color: #ff0000;">VIRTUAL ANGEL</h1>
      <h2 style="margin-bottom: 20px;">Confirm your account</h2>
      <p style="font-size: 16px; line-height: 1.6;">Hi! Thank you for registering with us.</p>
      <p style="font-size: 16px;">To activate your account, please click the button below:</p>
      
      <a href="${link}" style="display: inline-block; margin-top: 25px; padding: 14px 30px; background-color: #ff0000; color: #fff; text-decoration: none; font-weight: bold; border-radius: 8px; transition: background-color 0.3s ease;">
        VERIFY ACCOUNT
      </a>
      
      <p style="margin-top: 30px; font-size: 12px; color: #777;">This link will expire in 24 hours.</p>
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: #555;">© 2025 Virtual Angel. All rights reserved.</p>
  </div>
  `,
});

    console.log("✅ Correo enviado correctamente");
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};

