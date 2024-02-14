import { Router } from "express";


const messageRouter = Router()

messageRouter.get("/", async (req, res) => {

    res.render("chat", {
        style: "/css/chat.css"
    });
})


export { messageRouter }