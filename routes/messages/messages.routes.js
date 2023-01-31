const { Router } = require('express')
const messagesModel = require('../../dao/models/messages/messages.models')

const router = Router()

router.get('/messages', async (req, res) => {
    let messages = await messagesModel.find();
    res.json({
        status: "OK",
        payload: messages
    })
})

router.post('/messages', async (req, res) => {
    const { user, message } = req.body
    if (!user || !message) return res.json({
        status: "ERROR",
        error: "Missing parameters"
    })
    let result = await messagesModel.create({user, message});
    return res.json({
        status: "OK",
        payload: result
    })
})

module.exports = router