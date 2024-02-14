import { cartsModel } from "../models/cartModel.js"

class CartsDAO {

    static async getAll() {
        return cartsModel.find().lean()
    }

    static async getAllWithStock() {
        return cartsModel.find({ stock: { $gt: 0 } }).lean()
    }

    static async getById(id) {
        return cartsModel.findOne({ _id: id }).lean()
    }

    static async add(title, description, price, stock, photo) {
        return new cartsModel({ title, description, price, stock, photo }).save()
    }

    static async update(id, data) {
        return cartsModel.findOneAndUpdate({ _id: id }, data)
    }

    static async remove(id) {
        return cartsModel.findOneAndDelete({ id }).lean()
    }

}


export default CartsDAO;