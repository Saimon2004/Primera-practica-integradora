import { messagesModel } from "../models/messageModel.js"

class MessageDAO {

    static async getAll() { //
        return messagesModel.find().lean()
    }

    static async getAllWithStock() {
        return messagesModel.find({ stock: { $gt: 0 } }).lean()
    }

    static async getById(id) {
        return messagesModel.findOne({ _id: id }).lean()
    }

    static async add(title, description, price, stock, photo) {
        return new messagesModel({ title, description, price, stock, photo }).save()
    }

    static async update(id, data) {
        return messagesModel.findOneAndUpdate({ _id: id }, data)
    }

    static async remove(id) {
        return messagesModel.findOneAndDelete({ id }).lean()
    }

}


export default MessageDAO;