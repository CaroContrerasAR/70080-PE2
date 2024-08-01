import { Router } from "express";
import CartManager from '../controller/cartsManager.controller.js'

const router = Router()
const manager = new CartManager()

router.post('/', async (req, res) => {
    try{
        res.status(200).send(await manager.createCarts())                
    } catch(err){
        res.status(500).send({ err: err.message, message:"POST Error" })
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const findCarts = await manager.getCartsById(req.params.cid)
        res.status(200).json( findCarts.products )
    } catch (err) {
        res.status(500).send({ err: err.message, message:"GET Error with cid" })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid  //parseInt(req.params.cid)
    const productId = req.params.pid  //parseInt(req.params.pid)
    const quantity = req.body.quantity || 1
    try{
        const updatedCarts = await manager.addProductInCart(cartId,productId, quantity)
        res.status(200).send (updatedCarts.products)
    } catch (err) {
        res.status(500).send({ err: err.message, message:"POST Error with cid & pid" })
    }
})

// router.put('/:pid', async(req,res) => {
//     const id = req.params.pid
//     const updateCart = req.body
//     res.status(200).send(await manager.updateCart(id, updateCart))
// })

// router.delete('/:pid', async(req,res) => {
//     const id = req.params.pid
//     res.status(200).send(await manager.deleteCart(id))
// })

export default router