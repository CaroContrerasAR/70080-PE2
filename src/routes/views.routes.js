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

export default router