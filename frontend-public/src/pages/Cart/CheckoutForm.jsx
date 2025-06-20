import React, { useState } from "react";
import "../Cart/Checkout.css";

function CheckoutForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nombreCliente: "",
    emailCliente: "",
    monto: 0.01,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombreCliente: "",
      emailCliente: "",
      monto: 0.01,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert("Generando token de acceso...");

      // 1. Obtener token de backend
      const tokenResponse = await fetch("http://localhost:3001/api/payment/get-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        throw new Error(`Error al obtener token: ${errorText}`);
      }

      const { access_token } = await tokenResponse.json();

      alert("Token generado. Enviando pago...");

      // 2. Armar objeto para pago (solo los datos necesarios, sin info de tarjeta)
      const payload = {
        monto: formData.monto,
        emailCliente: formData.emailCliente,
        nombreCliente: formData.nombreCliente,
        tokenTarjeta: "null", // simulamos pago sin token de tarjeta
      };

      // 3. Enviar pago al backend para que llame a Wompi
      const paymentResponse = await fetch("http://localhost:3001/api/payment/test-payment-sin3ds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: access_token,
          formData: payload,
        }),
      });

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Error al procesar pago: ${errorText}`);
      }

      const result = await paymentResponse.json();
      console.log("Respuesta del pago:", result);
      alert("✅ ¡Pago simulado correctamente!");
      setStep(2);
      limpiarFormulario();
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      alert(`❌ ${error.message}`);
    }
  };

  if (step === 2) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
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
            <div className="mb-4">
              <label className="form-label text-white">Nombre</label>
              <input
                type="text"
                name="nombreCliente"
                className="form-control input-custom"
                required
                onChange={handleChange}
                value={formData.nombreCliente}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Email</label>
              <input
                type="email"
                name="emailCliente"
                className="form-control input-custom"
                required
                onChange={handleChange}
                value={formData.emailCliente}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Monto</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="monto"
                className="form-control input-custom"
                required
                onChange={handleChange}
                value={formData.monto}
              />
            </div>

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
