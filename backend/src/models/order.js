import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  idCustomer: {
    type: Schema.Types.ObjectId,
    ref: "clients", 
    required: true,
  },
  products: [
    {
      idProduct:{
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        min: [1, "La cantidad debe ser al menos 1"],
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
        min: [0, "El subTotal no puede ser negativo"],
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Processing", "Pending", "Paid", "Completed", "Cancelled", "Finished"], 
    required: true,
  },
  totalquantity: {
    type: Number,
    min: 0,
    required: true,
  },
}, {
  timestamps: true,
});

export default model("Order", orderSchema);
