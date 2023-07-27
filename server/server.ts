import express from 'express'
import path from 'path'

import cards from './routes/cards'
import sets from './routes/sets'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// Routes
server.use('/api/v1/cards/', cards)
server.use('/api/v1/sets/', sets)

// TODO: add deployment only dist redirect

export default server
