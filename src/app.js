import express from 'express'
import { engine } from 'express-handlebars'
import { Server } from "socket.io"

import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'

const app = express()
const PORT = 8080

//configuracion Express-Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "src/views")

//Midlewares
app.use(express.json())
app.use(express.static("./src/public"))

//Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


// app.get('/',(req,res)=>{
    //     res.status(200).send('Pre-entrega 2 - Carolina Contreras')
    // })
    
    app.get('/', (req,res)=>{
        res.render("home")
    })
    // app.listen(PORT, ()=>{
        //     console.log(`Server Express online in Port ${PORT}`);
        // })
        
        //new Listen
        const httpServer = app.listen(PORT, () => {
            console.log(`Server online in Port ${PORT}`); 
        })
        
        
        //Generamos uns instancia de websocket desde el lado del backend
        const io = new Server(httpServer)