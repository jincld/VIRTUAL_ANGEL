/*
fields:
name
description
idCategory
sizes
prices
stock
image
color
*/

import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    sizes: {
        type: String
    },
    prices: {
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
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Products", productsSchema);