import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },

    content: {
        type: String,
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now
    }

})

export const messagesModel = mongoose.model("Messages", messagesSchema)