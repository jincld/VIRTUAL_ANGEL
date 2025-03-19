/*
    fields:
        email
        message
*/

import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("contact", contactSchema);
