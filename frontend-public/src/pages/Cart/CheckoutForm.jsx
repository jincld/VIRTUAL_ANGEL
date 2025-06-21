import React, { useState, useEffect } from "react";
import "../Cart/Checkout.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nombreCliente: "",
    emailCliente: "",
    direccion: "",
    monto: 0.01,
    numeroTarjeta: "",
    mesExpiracion: "",
    anioExpiracion: "",
    cvv: "",
  });

  // Cargar total del carrito
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );
    setFormData((prev) => ({ ...prev, monto: total.toFixed(2) }));
  }, [cart]);

  // Cargar email y nombre del usuario autenticado
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const resMe = await fetch("http://localhost:3001/api/me", {
          credentials: "include",
        });
        if (!resMe.ok) throw new Error("Usuario no autenticado");

        const { userId } = await resMe.json();

        const resUser = await fetch(`http://localhost:3001/api/clients/${userId}`, {
          credentials: "include",
        });
        if (!resUser.ok) throw new Error("No se pudo obtener datos del cliente");

        const userData = await resUser.json();

        setFormData((prev) => ({
          ...prev,
          emailCliente: userData.email || "",
          nombreCliente: userData.name || "",
        }));
      } catch (error) {
        console.error("Error cargando información del usuario:", error.message);
      }
    };

    fetchUserEmail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setFormData({
      nombreCliente: "",
      emailCliente: "",
      direccion: "",
      monto: 0.01,
      numeroTarjeta: "",
      mesExpiracion: "",
      anioExpiracion: "",
      cvv: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert("Generando token de acceso...");

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

      const payload = {
        monto: formData.monto,
        emailCliente: formData.emailCliente,
        nombreCliente: formData.nombreCliente,
        tarjeta: {
          numero: formData.numeroTarjeta,
          mes: formData.mesExpiracion,
          anio: formData.anioExpiracion,
          cvv: formData.cvv,
        },
        tokenTarjeta: "null",
      };

      const paymentResponse = await fetch(
        "http://localhost:3001/api/payment/test-payment-sin3ds",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: access_token,
            formData: payload,
          }),
        }
      );

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        throw new Error(`Error al procesar pago: ${errorText}`);
      }

      const result = await paymentResponse.json();
      alert("✅ ¡Pago simulado correctamente!");

      const orderData = {
        idCustomer: formData.emailCliente,
        products: cart.map(item => ({
          idProduct: item._id || item.id || item.productId,
          quantity: Number(item.quantity),
          subtotal: Number(item.price) * Number(item.quantity),
        })),
        total: Number(formData.monto),
        address: formData.direccion,
        totalquantity: cart.reduce((sum, item) => sum + Number(item.quantity), 0),
        date: new Date().toISOString(),
        status: "Processing",
        cliente: {
          nombre: formData.nombreCliente,
          email: formData.emailCliente,
        },
        pagoId: result.payment?.id || null,
      };

      const orderResponse = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Error al crear orden: ${errorText}`);
      }

      await orderResponse.json();
      alert("Orden creada con éxito.");
      clearCart();
      limpiarFormulario();
      setStep(2);
      navigate("/cart");
    } catch (error) {
      console.error("Error en el proceso de pago y orden:", error);
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
              <label className="form-label text-white">Name</label>
              <input
                type="text"
                name="nombreCliente"
                className="form-control input-custom"
                required
                onChange={handleChange}
                value={formData.nombreCliente}
                readOnly
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
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Address</label>
              <input
                type="text"
                name="direccion"
                className="form-control input-custom"
                required
                onChange={handleChange}
                value={formData.direccion}
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Card Number</label>
              <input
                type="text"
                name="numeroTarjeta"
                className="form-control input-custom"
                required
                maxLength={16}
                pattern="\d{16}"
                onChange={handleChange}
                value={formData.numeroTarjeta}
              />
            </div>

            <div className="mb-4 d-flex gap-3">
              <div style={{ flex: 1 }}>
                <label className="form-label text-white"> Expiration Month </label>
                <input
                  type="text"
                  name="mesExpiracion"
                  className="form-control input-custom"
                  required
                  maxLength={2}
                  pattern="\d{2}"
                  onChange={handleChange}
                  value={formData.mesExpiracion}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label text-white"> Expiration Year</label>
                <input
                  type="text"
                  name="anioExpiracion"
                  className="form-control input-custom"
                  required
                  maxLength={2}
                  pattern="\d{2}"
                  onChange={handleChange}
                  value={formData.anioExpiracion}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label text-white">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="form-control input-custom"
                  required
                  maxLength={3}
                  pattern="\d{3}"
                  onChange={handleChange}
                  value={formData.cvv}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-white">Total</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="monto"
                className="form-control input-custom"
                required
                value={formData.monto}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-danger w-100 py-3 fw-bold fs-5 send-button"
              disabled={cart.length === 0}
            >
              PAY NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
