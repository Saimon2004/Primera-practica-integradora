import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { messageRouter } from "./routes/messages.router.js";
import { productsRouter } from "./routes/products.router.js";
import { Server } from "socket.io";
import { MessageDAO } from "./daos/dbManagers/messagesManager.js";



const uri = "mongodb+srv://Simon:Kf9Roq0MkB3psG7f@cluster0.qhitjde.mongodb.net/Ecommerse?retryWrites=true&w=majority";

const app = express()
const httpServer = app.listen(3000, () => {
    console.log("se inicio la aplicacion")
})

const socketServer = new Server(httpServer)

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


socketServer.on("connection", async (socket) => {
    console.log("usuario conectado con id: " + socket.id);

    try {
        // Obtener los mensajes anteriores
        const messages = await MessageDAO.getMessages();

        // Enviar los mensajes anteriores al nuevo usuario
        socket.emit("previousMessages", messages);
    } catch (error) {
        console.error("Error al obtener mensajes anteriores:", error);
    }


    socket.on("chatMessage", async (data) => {
        try {
            // Crear un nuevo mensaje
            await MessageDAO.createMessage(data);

            // Emitir el mensaje recibido a todos los usuarios conectados
            socketServer.emit("messageReceived", data);
        } catch (error) {
            console.error("Error al crear mensaje:", error);
        }
    });

    socket.on("deleteMessages", async () => {
        try {
            const deleteMessages = await MessageDAO.deleteAllMessages();
            console.log("Mensajes borrados:", deleteMessages);

        } catch (error) {
            console.error("Error al tratar de borrar los mensajes:", error);
        }
    });
});


app.get("/", (req, res) => {
    res.render("home")
})

app.use((req, res, next) => {
    res.render("404")
})

mongoose.connect(uri);



