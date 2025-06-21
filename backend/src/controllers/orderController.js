import orderModel from "../models/order.js";
import userModel from "../models/clients.js";

const orderController = {};

// Obtener todas las órdenes
orderController.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate("idCustomer")
      .populate("products.idProduct");

    res.json(orders);
  } catch (error) {
    console.error("Error en getOrders:", error);
    res.status(500).json({ message: "Error fetching orders", error: error.message, stack: error.stack });
  }
};

// Obtener una orden por ID
orderController.getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id)
      .populate("idCustomer")
      .populate("products.idProduct");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error en getOrderById:", error);
    res.status(500).json({ message: "Error fetching order", error: error.message, stack: error.stack });
  }
};

// Insertar nueva orden
orderController.insertOrder = async (req, res) => {
  const {
    idCustomer, 
    products,
    total,
    address,
    date,
    status,
    cliente,
    pagoId,
    totalquantity
  } = req.body;

  try {
    const user = await userModel.findOne({ email: idCustomer });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const newOrder = new orderModel({
      idCustomer: user._id,
      products,
      total,
      address,
      date,
      status,
      cliente,
      pagoId,
      totalquantity,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved", order: newOrder });
  } catch (error) {
    console.error("Error en insertOrder:", error);
    res.status(500).json({ message: "Error saving order", error: error.message, stack: error.stack });
  }
};

// Actualizar estado de orden
orderController.updateOrder = async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error en updateOrder:", error);
    res.status(500).json({ message: "Error updating order", error: error.message, stack: error.stack });
  }
};

// Borrar orden
orderController.deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error("Error en deleteOrder:", error);
    res.status(500).json({ message: "Error deleting order", error: error.message, stack: error.stack });
  }
};

export default orderController;
