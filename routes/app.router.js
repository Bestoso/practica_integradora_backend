const { Router } = require('express')

const router = Router()

router.use('/api', require('./products/products.routes'))
router.use('/api', require('./carts/carts.routes'))
router.use('/api', require('./users/users.routes'))

router.use('/', require('./static/static.routes'))

module.exports = router