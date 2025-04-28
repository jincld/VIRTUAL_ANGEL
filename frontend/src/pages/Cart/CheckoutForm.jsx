import React from "react";
import "../Cart/Checkout.css"; 

 function CheckoutForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your purchase! 🎉");
  };

  return (
    <div className="position-relative min-vh-100 bg-black">

      {/* Fondo oscuro fijo */}
      <div className="backcartsCheckout"></div>

      {/* Caja contenedora */}
      <div className="container d-flex flex-column justify-content-center align-items-center py-5 content-zone">
        
        {/* Caja del formulario */}
        <div className="form-background p-5" style={{ maxWidth: "600px", width: "100%", borderRadius: "15px", backgroundColor: "#111", boxShadow: "0px 4px 20px rgba(0,0,0,0.7)" }}>
          
          <h1 className="mb-5 display-6 fw-bold text-center text-white text-uppercase">Checkout</h1>

          <form onSubmit={handleSubmit} className="w-100">

            {/* Nombre */}
            <div className="mb-4">
              <label className="form-label text-white">Full Name</label>
              <input
                type="text"
                className="form-control input-custom"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Dirección */}
            <div className="mb-4">
              <label className="form-label text-white">Shipping Address</label>
              <input
                type="text"
                className="form-control input-custom"
                placeholder="123 Main St"
                required
              />
            </div>

            {/* Gmail */}
            <div className="mb-4">
              <label className="form-label text-white">Gmail Address</label>
              <input
                type="email"
                className="form-control input-custom"
                placeholder="example@gmail.com"
                pattern=".+@gmail\.com"
                title="Please enter a valid Gmail address"
                required
              />
            </div>

            {/* Información bancaria */}
            <h5 className="text-center mt-5 mb-4 text-danger">Payment Information</h5>

            <div className="mb-4">
              <label className="form-label text-white">Card Number</label>
              <input
                type="text"
                className="form-control input-custom"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label text-white">Expiry Date</label>
                <input
                  type="text"
                  className="form-control input-custom"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-white">CVV</label>
                <input
                  type="text"
                  className="form-control input-custom"
                  placeholder="123"
                  maxLength="4"
                  required
                />
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-outline-danger w-100 py-3 fw-bold fs-5 send-button"
            >
              PAY NOW
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default CheckoutForm
