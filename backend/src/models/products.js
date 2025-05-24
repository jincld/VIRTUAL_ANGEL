import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    image: {
        type: String
    },
    color: {
        type: String
    },
    colorcode: {
        type: String
    },
    coleccion: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("products", productsSchema);