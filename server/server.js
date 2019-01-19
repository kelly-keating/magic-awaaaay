const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('superagent')

const routes = require('./routes')

const app = express()

// Middleware
app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/', routes)

module.exports = app