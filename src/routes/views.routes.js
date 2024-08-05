import { Router } from 'express'
import ProductManager from '../controller/productsManager.controller.js'

const router = Router()
const manager = new ProductManager('./src/data/products.json')

router.get('/products', async (req, res) => {
    try {
        const products = await manager.getProducts()
        res.render("home", {title:'Home', products})
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.get('/realtimeproducts', async (req, res) => {
    //solo con websockets, al crear o eñliminar productos se actualiza atumaticamente la vista
    try {
        const products = await manager.getProducts()
        res.render("realTimeProducts", {title:'RealTimeProducts',products})
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

/*  DESAFÍO ENTREGABLE - PROCESO DE TESTING

Websockets

Se instalará y correrá el servidor en el puerto indicado.
El servidor debe levantarse sin problema.
Se abrirá la ruta raíz
Debe visualizarse el contenido de la vista index.handlebars
No se debe activar el websocket aún.
Se buscará en la url del navegador la ruta “/realtimeproducts”.
Se corroborará que el servidor haya conectado con el cliente, en la consola del servidor deberá mostrarse un mensaje de “cliente conectado”.
Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.
 */

export default router