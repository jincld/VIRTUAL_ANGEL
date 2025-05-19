import orderModel from "../models/order.js";
 
const orderController = {};
// Select (Get Orders)
orderController.getOrder = async (req, res) => {
    try {
        const orders = await orderModel.find().populate("idCustomer").populate("idProducts");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Insert (Create Order)
orderController.insertOrder = async (req, res) => {
    const { idCustomer, idProducts, total, address } = req.body;
    try {
        const newOrder = new orderModel({ idCustomer, idProducts, total, address });
        await newOrder.save();
        res.json({ message: "Order saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving order", error: error.message });
    }
};

// Delete (Delete Order)
orderController.deleteOrder = async (req, res) => {
    try {
        await orderModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error: error.message });
    }
};

// Update (Update Order)
orderController.updateOrder = async (req, res) => {
    const { idCustomer, idProducts, total, address } = req.body;
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(req.params.id, 
            { idCustomer, idProducts, total, address }, { new: true });
        res.json({ message: "Order updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error: error.message });
    }
};

export default orderController;
