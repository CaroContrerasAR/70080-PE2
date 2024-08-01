import {Router} from 'express'
import ProductManager from '../controller/productsManager.controller.js'

const router = Router()
const manager = new ProductManager()

//Product List & http://localhost:8080/api/product?limit=2
router.get('/', async (req, res)=>{
    const {limit} = req.query
    try {
        const arrayProduct = await manager.getProducts()
        if(limit){
            res.status(200).send(arrayProduct.slice(0, limit))
        } else {
            res.status(200).send(arrayProduct)
        }
    } catch (err) {
        res.status(500).send({ err : err.message, message:"GET Error"})
    }
})

router.get('/:pid', async (req,res)=>{
    let id = req.params.pid
    try {
        const product = await manager.getProductById(id)
        res.status(200).send({product})
    } catch (err) {
        res.status(500).send({ err : err.message, message:"GET Error with PID" })
    }
})

router.post('/', async (req, res)=>{
    const newProduct = req.body
    try {
        return res.status(201).send(await manager.addProduct(newProduct))
    } catch (err) {
        res.status(500).send({ err : err.message, message:"POST Error" })
    }
})

router.put('/:pid', async (req, res)=>{
    try {
        const id = req.params.pid
        const updateProduct = req.body
        return res.status(200).send(await manager.updateProducts(id, updateProduct))
    } catch (err) {
        res.status(500).send({ err : err.message, message:"PUT Error" })
    }
})

router.delete('/:pid', async (req, res)=>{
    try {
        const id = req.params.pid
        res.status(200).send(await manager.deleteProducts(id))
    } catch (err) {
        res.status(500).send({ err : err.message, message:"DEL Error" })
    }
})

export default router