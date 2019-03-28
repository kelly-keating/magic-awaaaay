const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const cards = require('./routes/cards')
const sets = require('./routes/sets')

const server = express()

// Middleware
server.use(express.static(path.join(__dirname, './public')))
server.use(bodyParser.urlencoded({ extended: false }))

// Routes
server.use('/api/v1/cards/', cards)
server.use('/api/v1/sets/', sets)

module.exports = server