import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
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
        type: String,
    },
})

export const cartsModel = mongoose.model("Carts", cartsSchema)