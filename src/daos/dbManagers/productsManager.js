import { productsModel } from "../models/productModel.js";

class ProductsDAO {

    static async getAll() {
        try {
            return await productsModel.find().lean();
        } catch (error) {
            console.error("Error en obtener todos los productos:", error);
        }
    }

    static async getAllWithStock() {
        try {
            return await productsModel.find({ stock: { $gt: 0 } }).lean();
        } catch (error) {
            console.log("Error en obtener todos los productos con stock:", error);
        }
    }

    static async getById(id) {
        try {
            return await productsModel.findOne({ _id: id }).lean();
        } catch (error) {
            console.log("Error en obtener el producto con id:", error);
        }
    }

    static async add(title, description, price, stock, photo) {
        try {
            return await new productsModel({ title, description, price, stock, photo }).save();
        } catch (error) {
            console.log("Error en añadir un producto:", error);
        }
    }


    static async update(id, data) {
        try {
            return await productsModel.findOneAndUpdate({ _id: id }, data);
        } catch (error) {
            console.log("Error en actualizar un producto:", error);
        }
    }

    static async remove(id) {
        try {
            return await productsModel.findOneAndDelete({ _id: id }).lean();
        } catch (error) {
            console.log("Error en eliminar un producto:", error);
        }
    }
}

export default ProductsDAO;
