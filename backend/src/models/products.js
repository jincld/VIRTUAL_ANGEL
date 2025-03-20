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
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true,
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    sizes: {
        type: String,
        require: true
    },
    prices: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    image: {
        type: String
    },
    color: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Products", productsSchema);