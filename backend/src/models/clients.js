import { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    gender: {
      type: String,
    },
    cardNumber: {
      type: Number,
      min: 0,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      min: 8,
    },
    email: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      default: 'client'
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("clients", clientsSchema);
