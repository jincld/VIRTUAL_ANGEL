/*
fields:
idCustomer
idProducts
comment
assessment
*/

import { Schema, model } from "mongoose";

const assessmentSchema = new Schema({
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
    comment: {
        type: String,
        require: true
    },
    assessment: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Assessment", assessmentSchema); 