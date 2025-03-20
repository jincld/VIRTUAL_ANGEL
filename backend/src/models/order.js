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
        require: true
    },
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Order", orderSchema);