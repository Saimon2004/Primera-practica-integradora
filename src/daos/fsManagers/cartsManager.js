import fs from "fs"

const persona = async () => {

    await fs.promises.writeFile("./persona.txt", "hola")

}

persona()