import 'dotenv/config'
import express from 'express'
import path from 'path'
import request from 'superagent'

import * as db from './db/db'

import cards from './routes/cards'
import sets from './routes/sets'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// Routes
server.use('/api/v1/cards/', cards)
server.use('/api/v1/sets/', sets)

server.get('/api/v1/currencies', async (req, res) => {
  const fcaKey = process.env.FCA_KEY
  const url = "https://api.freecurrencyapi.com/v1/latest?base_currency=NZD&currencies=USD,EUR&apikey=" + fcaKey

  try {
    const currencies = await db.getCurrencies()
    if (Date.now() - Date.parse(currencies.date) < 43200000) {
      res.json(currencies)
    } else {
      const response = await request.get(url)
      const { USD, EUR } = response.body.data
      const newDate = {
        usd: 1 / USD,
        eur: 1 / EUR,
        date: Date().toString(),
      }
      await db.updateCurrencies(newDate)
      res.json(newDate)
    }
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
})

// TODO: add deployment only dist redirect

export default server
