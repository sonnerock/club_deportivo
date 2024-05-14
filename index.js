const express = require("express")
const fs = require("node:fs/promises")
const axios = require("axios")

const app = express()

app.listen(3000, () => console.log("escuchando puerto 3000"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/agregar", (req, res) => {
    const { nombre, precio } = req.query

    const actividades = {
        nombre: nombre,
        precio: precio
    }

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            const jsonDeportes = JSON.parse(data)

            jsonDeportes.deportes.push(actividades)

            fs.writeFile("./data/deportes.json", JSON.stringify(jsonDeportes))
                .then(() => {
                    res.send("Deporte ingresado con exito")

                })
        })


})

app.get("/deportes", (req, res) => {
    fs.readFile("./data/deportes.json", "utf-8",)
        .then(data => {
            let info = JSON.parse(data)

            res.send(info)
        }

        )
})

app.put("/editar", (req, res) => {
    const { nombre, precio } = req.query

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            let info2 = JSON.parse(data)

            for (let i = 0; i < info2.deportes.length; i++) {
                if (info2.deportes[i].nombre === nombre) {
                    info2.deportes[i].precio = precio
                }
            }
            fs.writeFile("./data/deportes.json", JSON.stringify(info2))
                .then(() => {
                    res.send("Deporte modificado con exito")

                })

        })
})

app.delete("/eliminar", (req, res) => {
    const { nombre } = req.query

    console.log(nombre)

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            let info3 = JSON.parse(data)


            info3.deportes = info3.deportes.filter(item => item.nombre !== nombre);

            fs.writeFile("./data/deportes.json", JSON.stringify(info3))
                .then(() => {
                    res.send("Deporte eliminado con exito")

                })
        })

})
