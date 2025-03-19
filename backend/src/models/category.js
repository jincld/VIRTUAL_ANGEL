/*
    fields:
        name
        description
*/

import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    desciption: {
      type: String,
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Category", categorySchema);