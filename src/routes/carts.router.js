import { Router } from "express";
import { cartsModel } from "../daos/models/cartModel.js";


const cartsRouter = Router()


cartsRouter.get("/", async (req, res) => {

    try {

        let carts = await cartsModel.find()
        res.send({ result: "sucess", payload: carts })

    } catch (error) {
        console.log("cannot get users with mongoose: ", error)
    }
})

cartsRouter.post("/", async (req, res) => {
    let { first_name, last_name, email } = req.body

    if (!first_name || !last_name || !email) {
        res.status(400).send({
            status: 400,
            result: "Error",
            error: "incomplete values"
        })
    }

    try {

        let result = await cartsModel.create({

            first_name,
            last_name,
            email
        })


        res.status(200).send({
            status: 200,
            result: "sucess",
            payload: result
        })

    } catch (error) {
        console.log("cannot save user on mongo: ", error)
        res.status.send({
            status: 500,
            result: "Error",
            error: "Error saving data on DB"
        })
    }
})

cartsRouter.put("/:uid", async (req, res) => {

    let { uid } = req.params

    let userToReplace = req.body

    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
        res.status(400).send({
            status: 400,
            result: "Error",
            error: "incomplete values"
        })
    }

    try {

        let result = await cartsModel.updateOne({ _id: uid }, userToReplace)

        res.status(200).send({
            status: 200,
            result: "sucess",
            payload: result
        })

    } catch (error) {

        console.log("cannot update user on mongo: ", error)
        res.status.send({
            status: 500,
            result: "Error",
            error: "Error updating data on DB"
        })
    }

})

cartsRouter.delete("/:uid", async (req, res) => {

    let { uid } = req.params

    try {

        let result = await cartsModel.deleteOne({ _id: uid })

        res.status(200).send({
            status: 200,
            result: "sucess",
            payload: result
        })

    } catch (error) {

        console.log("cannot delete user on mongo: ", error)
        res.status.send({
            status: 500,
            result: "Error",
            error: "Error deleting data on DB"
        })
    }
})

export { cartsRouter }