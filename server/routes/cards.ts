import { Router } from 'express'
const router = Router()

import * as db from '../db/db'

router.get('/', (req, res) => {
  db.getCards()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.get('/single/:id', (req, res) => {
  db.getCardById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.get('/set/:set', (req, res) => {
  db.getCardsFromSet(req.params.set)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

export default router
