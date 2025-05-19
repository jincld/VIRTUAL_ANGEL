/*
fields:
idCustomer
idProducts
total
address
*/

import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  idCustomer: {
    type: Schema.Types.ObjectId,
    ref: "customers",
    required: true, // ← corregido de "require"
  },
  idProducts: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
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
    enum: ["In progress", "Processing", "Delivered", "Shipped", "Canceled"],
    default: "In progress",
  },
}, {
  timestamps: true,
});


export default model ("Order", orderSchema);