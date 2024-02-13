import { Router } from "express";
import ProductsDAO from "../daos/dbManagers/productsManager.js";

const messageRouter = Router()

messageRouter.get("/", async (req, res) => {

    res.render("chat");
})


export { messageRouter }