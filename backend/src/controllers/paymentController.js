import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

// Obtener token de Wompi
export const getToken = async (req, res) => {
  try {
    const url = "https://id.wompi.sv/connect/token";
    const { GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, AUDIENCE } = process.env;

    if (!GRANT_TYPE || !CLIENT_ID || !CLIENT_SECRET || !AUDIENCE) {
      return res.status(500).json({ error: "Faltan variables de entorno necesarias." });
    }

    const params = new URLSearchParams();
    params.append("grant_type", GRANT_TYPE);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("audience", AUDIENCE);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "Error al obtener token", detail: errorText });
    }

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Error interno al obtener token", detail: error.message });
  }
};

// Procesar pago de prueba sin 3DS
export const testPaymentSin3DS = async (req, res) => {
  try {
    const { token, formData } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token de autorización faltante." });
    }

    if (!formData) {
      return res.status(400).json({ error: "Datos de pago faltantes." });
    }

    const response = await fetch("https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorJson.message || "Error al procesar el pago",
      });
    }

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Error al procesar el pago", detail: error.message });
  }
};
