const { Router } = require('express')
const cartsModel = require('../../dao/models/carts/carts.models')

const router = Router()

router.get('/carts', async (req, res) => {
    try {
        let carts = await cartsModel.find()
        res.json({
            status: "OK",
            payload: carts
        })
    } catch (err) {
        res.json({
            status: "ERROR",
            error: "Could not GET carts"
        })
    }
})

module.exports = router