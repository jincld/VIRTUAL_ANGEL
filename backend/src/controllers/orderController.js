const orderController = {};
import orderModel from "../models/order.js";

//select
orderController.getOrder = async (req, res) => {
    const orders = await orderModel.find().populate("idCustomer")
    res.json(orders)
}

//insert
orderController.insertOrder = async (req, res) => {
    const {idCustomer, idProducts, total, address} = req.body;
    const newOrder = new orderModel ({idCustomer, idProducts, total, address})
    await newOrder.save()
    res.json({message: "Order saved"})
}

//delete
orderController.deleteOrder = async (req, res) => {
    await orderModel.findByIdAndDelete(req.params.id)
    res.json({message: "Order deleted"})
}

//update
orderController.updateOrder = async (req, res) => {
    const{idCustomer, idProducts, total, address} = req.body;
    await orderModel.findByIdAndUpdate(req.params.id,
        {idCustomer, idProducts, total, address}, {new:true}
    );
    res.json({message: "Order updated"});
};

export default orderController;