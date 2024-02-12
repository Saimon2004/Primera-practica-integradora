import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { messageRouter } from "./routes/messages.router.js";
import { productsRouter } from "./routes/products.router.js";




const uri = "mongodb+srv://Simon:Kf9Roq0MkB3psG7f@cluster0.qhitjde.mongodb.net/Ecommerse?retryWrites=true&w=majority";

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));
app.use("/carts", cartsRouter)
app.use("/messages", messageRouter)
app.use("/products", productsRouter)


app.get("/", (req, res) => {
    res.render("home")
})

app.use((req, res, next) => {
    res.render("404")
})

mongoose.connect(uri);

app.listen(3000, () => {
    console.log("se inicio la aplicacion")
})