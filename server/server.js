const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('superagent')

const cards = require('./routes/cards')
const sets = require('./routes/sets')

const app = express()

// Middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/api/v1/cards/', cards)
app.use('/api/v1/sets/', sets)

module.exports = app