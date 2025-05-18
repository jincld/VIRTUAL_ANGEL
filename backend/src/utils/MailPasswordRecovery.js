import nodemailer from "nodemailer";
import { config } from "../config.js";

//Hacemos los tres pasos para enviar correos
//1- ¿Quien lo envia?
//2- ¿Quien lo recibe?
//3- Envío del correo

//1- Transporter = ¿Quien lo envia?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

//2- ¿Quien lo recibe?
const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Virtual Angel"',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.log("Error sending recovery email" + console.error);
  }
};

//3- Funcion para generar el HTML del correo que vamos a enviar
const HTMLRecoveryEmail = (code) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Recovery</title>
    </head>
    <body style="
      margin: 0;
      padding: 0;
      background-repeat: repeat;
      background-size: cover;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    ">

      <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #111111;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        border: 2px solid #ff0033;
        backdrop-filter: blur(4px);
      ">

        <h2 style="color: #ff0033; font-size: 28px; letter-spacing: 1px; margin-bottom: 20px;">
          PASSWORD RESET
        </h2>

        <p style="font-size: 16px; color: #f0f0f0; line-height: 1.6;">
          Someone requested a password reset for your account.
          Use the code below to continue:
        </p>

        <div style="
          margin: 30px 0;
          font-size: 32px;
          font-weight: bold;
          padding: 15px 30px;
          background-color: #ff0000;
          color: #000000;
          border-radius: 4px;
          letter-spacing: 4px;
          display: inline-block;
        ">
          ${code}
        </div>

        <p style="font-size: 14px; color: #aaaaaa;">
          Didn't request this? Just ignore this email.
        </p>

<p style="margin-top: 40px; font-size: 12px; color: #aaaaaa;">
  Act like and ANGEL and dress like CRAZY — Virtual Angel &copy; ${new Date().getFullYear()}
</p>


      </div>
    </body>
    </html>
  `;
};






export { sendMail, HTMLRecoveryEmail };