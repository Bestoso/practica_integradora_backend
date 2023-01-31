const { Router } = require('express')
const productsModel = require('../../dao/models/products/products.models')

const router = Router()

router.get('/products', async (req, res) => {
    try {
        let products = await productsModel.find()
        res.json({
            status: "OK",
            payload: products
        })
    } catch (err) {
        res.json({
            status: "ERROR",
            error: 'Cannot GET users: ' + err
        })
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        let result = await productsModel.find({_id: id})
        res.json({
            status: "OK",
            payload: result
        })
    } catch (err) {
        res.json({
            status: "ERROR",
            error: 'Could not find the user. Error: ', err
        })
    }
})

router.post('/products', async (req, res) => {
    const { title, description, price, status, category } = req.body
    if (!title || !description || !price || !status || !category) return res.json({
        status: "ERROR",
        error: "Missing parameters"
    })
    let result = await productsModel.create({title, description, price, status, category})
    return res.json({
        status: "OK",
        payload: result
    })
})

router.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, price, status, category } = req.body
    const values = { title, description, price, status, category }
    if (!title || !description || !price || !status || !category) return res.json({
        status: "ERROR",
        error: "Missing parameters"
    })
    let result = await productsModel.updateOne({_id: id}, values)
    return res.json({
        status: "OK",
        payload: result
    })
})

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    let result = await productsModel.deleteOne({_id: id})
    return res.json({
        status: "OK",
        payload: result
    })
})


module.exports = router