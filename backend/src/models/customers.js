/*
    fields:
        name
        password
        age
        gender
        cardNumber
        address
        phone
        email
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    age: {
        type: Number,
        require: true,
        min: 0,
    },

    gender: {
        type: String,
      },

      cardNumber: {
        type: Number,
        require: true,
        min: 0,
      },
      address: {
        type: String,
      },

      phone: {
        type: Number,
        require: true,
        min: 8,
      },

      email: {
        type: String,
        require: true,
      },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customers", customersSchema);
