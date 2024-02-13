import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({

    user: String,
    message: String,
},
    { timestamps: true }
);

export const messagesModel = mongoose.model("Messages", messagesSchema)