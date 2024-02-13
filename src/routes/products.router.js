import { Router } from "express";
import ProductsDAO from "../daos/dbManagers/productsManager.js";
import upload from "../utils/upload.middleware.js";
import fs from 'fs';


const productsRouter = Router()


productsRouter.get("/", async (req, res) => {

    try {

        let withStock = req.body.stock;

        let products;

        if (withStock === undefined) {
            products = await ProductsDAO.getAll()
        } else {
            products = await ProductsDAO.getAllWithStock()
        }

        //anadir producto
        let productAdded = req.query.productAdded === 'true';
        let productTitle = req.query.productTitle;


        res.render("products", { products, productAdded, productTitle });

    } catch (error) {
        console.error("Hubo un problema en el servidor:", error);
        res.render("500");
    }
})

productsRouter.get("/new", (req, res) => {
    res.render("new-product", {
        style: "/css/new-product.css"
    });
})

productsRouter.get("/:id", async (req, res) => {
    try {

        let id = req.params.id

        if (!id) {
            res.redirect("/products/");
        }

        let product = await ProductsDAO.getById(id)

        if (!product) {
            res.render("404");
        }

        res.render("product", {
            id: product._id,
            title: product.title,
            description: product.description,
            photo: product.photo,
            price: product.price,
            isStock: product.stock > 0
        });



    } catch (error) {
        console.log("Hubo un problema en el servidor", error)
        res.render("500")
    }
})

productsRouter.post("/", upload.array('image', 5), async (req, res) => {

    try {

        if (!req.files || req.files.length === 0) {
            console.log("Faltan archivos");
            return res.redirect("/products");
        }

        let filenames = req.files.map(file => file.filename);
        let product = req.body;


        if (!product.title || !product.price || !product.stock) {
            console.log("Debe completar todos los campos")
            req.files.forEach(file => fs.unlinkSync(file.path));
            return res.redirect("/products");
        }

        await ProductsDAO.add(product.title, product.description, product.price, product.stock, filenames);

        res.redirect(`/products?productAdded=true&productTitle=${encodeURIComponent(product.title)}`);

    } catch (error) {
        console.error("Hubo un problema en el servidor:", error);
        res.render("500");
    }
})

//actualizar
productsRouter.post("/update/:id", async (req, res) => {

    try {
        const id = req.params.id;

        const { title, description, price, stock, photo } = req.body;

        console.log(req.body)

        await ProductsDAO.update(id, { title, description, price, stock, photo });

        res.redirect(`/products/${id}`);


    } catch (error) {
        console.error("Hubo un problema al actualizar el producto:", error);
        res.render("500");
    }
});


//borrar
productsRouter.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedProduct = await ProductsDAO.remove(id);

        if (!deletedProduct) {
            console.log("No se encontró el producto a eliminar");
            return res.status(404).send("Producto no encontrado");
        }

        res.render("delete-product")

    } catch (error) {
        console.error("Hubo un problema al eliminar el producto:", error);
        res.status(500).send("Hubo un problema al eliminar el producto");
    }
});



export { productsRouter }