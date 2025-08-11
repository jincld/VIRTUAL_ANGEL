import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
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
      phone: {
        type: String,
        require: true,
        min: 8,
      },

      email: {
        type: String,
        require: true,
      },
      rol: {
        type: String,
        require: true,
      },
      imagen: {
        type: String
      },
      loginAttempts: {
      type: Number,
      default: 0
    },
      lockTime: {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("employee", employeeSchema);
