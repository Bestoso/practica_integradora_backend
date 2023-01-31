const { Router } = require('express')
const usersModel = require('../../dao/models/users/users.models')

const router = Router()

router.get('/users', async (req, res) => {
    try {
        let users = await usersModel.find()
        res.json({
            status: "OK",
            payload: users
        })
    } catch (err) {
        res.json({
            status: "ERROR",
            error: 'Cannot GET users: ' + err
        })
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        let result = await usersModel.find({_id: id})
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

router.post('/users', async (req, res) => {
    const { first_name, last_name, password, age, email } = req.body
    if (!first_name || !last_name || !password || !age || !email) return res.json({
        status: "ERROR",
        error: "Missing parameters"
    })
    let result = await usersModel.create({first_name, last_name, password, age, email})
    return res.json({
        status: "OK",
        payload: result
    })
})

router.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { first_name, last_name, password, age, email } = req.body
    const values = { first_name, last_name, password, age, email }
    if (!first_name || !last_name || !password || !age || !email) return res.json({
        status: "ERROR",
        error: "Missing parameters"
    })
    let result = await usersModel.updateOne({_id: id}, values)
    return res.json({
        status: "OK",
        payload: result
    })
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    let result = await usersModel.deleteOne({_id: id})
    return res.json({
        status: "OK",
        payload: result
    })
})

module.exports = router