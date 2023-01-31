require('dotenv').config()
const express = require('express')
const cors = require('cors')
const hbs = require('hbs')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const productsModel = require('./dao/models/products/products.models')

const PORT = process.env.PORT || 8080
const app = express()

// middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// handlebars config

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

// routes

app.use('/', require('./routes/app.router'))

// server connections

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:` + PORT)
})

const io = new Server(httpServer)

io.on('connection', async ( socket ) => {
    console.log(socket.id)

    socket.emit('get:products', await productsModel.find());

    socket.on('chat:message', data => {
        console.log(data)
        io.emit('chat:message', data);
    })

    socket.on('chat:typing', data => {
        socket.broadcast.emit('chat:typing', data);
    })
})

mongoose.connect('mongodb+srv://sbestoso:ecommerce_chouse@cluster0.ko3h2dl.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log(err)
        process.exit()
    }
})