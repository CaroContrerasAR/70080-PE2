import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from "socket.io"

import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'

import ProductManager from './controller/productsManager.controller.js'
const manager = new ProductManager('./data/products.json')

const app = express()
const PORT = 8080

//configuracion Express-Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Midlewares
app.use(express.json())
app.use(express.static("./src/public"))

//Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


// app.get('/',(req,res)=>{
//         res.send(`<h1>Pre-entrega 2 - Carolina Contreras</h1>`)
// })
    
app.get('/', (req,res)=>{
    res.render("index")
})
    
//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Server SIO online in Port ${PORT}`); 
})
    
//Instancia de websocket desde el lado del backend
const io = new Server(httpServer)

io.on("connection",async(socket)=>{
    console.log("A customer logged in");
    socket.emit("products", await manager.getProducts()) 
        
    socket.on("deleteProduct", async(id)=>{
        await manager.deleteProducts(id)
        io.sockets.emit("products",await manager.getProducts())
    })

    socket.on("addProduct", async(products)=>{
        await manager.addProduct(products)
        io.sockets.emit("products",await manager.getProducts())
    })
})