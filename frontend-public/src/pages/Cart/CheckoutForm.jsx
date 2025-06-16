import React, { useState } from "react";
import "../Cart/Checkout.css";

function CheckoutForm() {
  const [step, setStep] = useState(1);
  const [accessToken, setAccessToken] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    monto: 0.01,
    urlRedirect: "https://www.ricaldone.edu.sv",
    idPais: "SV",
    idRegion: "SV-SS",
    codigoPostal: "1101",
  });

  const [formDataTarjeta, setFormDataTarjeta] = useState({
    numeroTarjeta: "",
    cvv: "",
    mesVencimiento: "",
    anioVencimiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formData.hasOwnProperty(name)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (formDataTarjeta.hasOwnProperty(name)) {
      setFormDataTarjeta((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Generando token...");

      const tokenResponse = await fetch("http://localhost:3001/api/token", {
        method: "POST",
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.text();
        throw new Error(`Error al obtener token: ${error}`);
      }

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.access_token);
      alert("Token generado. Procesando pago...");

      const paymentPayload = {
        ...formData,
        tarjetaCreditoDebido: formDataTarjeta,
      };

      const paymentResponse = await fetch("http://localhost:3001/api/payment3ds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenData.access_token, formData: paymentPayload }),
      });

      if (!paymentResponse.ok) {
        const error = await paymentResponse.text();
        throw new Error(`Error en el pago: ${error}`);
      }

      const paymentData = await paymentResponse.json();
      console.log("Respuesta del pago:", paymentData);
      alert("✅ ¡Pago realizado con éxito!");

      setStep(2);

    } catch (error) {
      console.error(error);
      alert(`❌ ${error.message}`);
    }
  };

  if (step === 2) {
    return (
      <div style={{color: "white", textAlign: "center", marginTop: "100px"}}>
        <h2>¡Pago exitoso!</h2>
        <p>Gracias por tu compra.</p>
      </div>
    );
  }

  return (
    <div className="position-relative min-vh-100 bg-black margin-top-global">
      <div className="backcartsCheckout"></div>

      <div className="container d-flex flex-column justify-content-center align-items-center py-5 content-zone">
        <div
          className="form-background p-5"
          style={{
            maxWidth: "600px",
            width: "100%",
            borderRadius: "15px",
            backgroundColor: "#111",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.7)",
          }}
        >
          <h1 className="mb-5 display-6 fw-bold text-center text-white text-uppercase">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="w-100">
            {/* Aquí tus inputs igual que ya tienes */}
            {/* ... */}
            {/* Ejemplo para nombre */}
            <div className="mb-4">
              <label className="form-label text-white">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control input-custom"
                placeholder="Juan"
                required
                onChange={handleChange}
              />
            </div>
            {/* Resto de campos igual */}
            {/* Tarjeta */}
            <h5 className="text-center mt-5 mb-4 text-danger">Información de la tarjeta</h5>

            <div className="mb-4">
              <label className="form-label text-white">Número de Tarjeta</label>
              <input
                type="text"
                name="numeroTarjeta"
                className="form-control input-custom"
                placeholder="1234 5678 9012 3456"
                required
                onChange={handleChange}
              />
            </div>
            {/* ... resto de inputs de tarjeta igual */}

            <button
              type="submit"
              className="btn btn-outline-danger w-100 py-3 fw-bold fs-5 send-button"
            >
              PAGAR AHORA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
