const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})

router.get('/products', (req, res) => {
    res.render('products', {
        title: "Products"
    })
})

router.get('/chat', (req, res) => {
    res.render('chat', {
        title: "Chat"
    })
})

module.exports = router