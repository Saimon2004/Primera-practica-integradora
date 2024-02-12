import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        require: true,
    },

    stock: {
        type: Number,
        require: true,
    },

    photo: {
        type: [String],
        require: true
    },
})

export const productsModel = mongoose.model("Products", productsSchema)