import { UserCard } from '../../models/cards'
import { Router } from 'express'
const router = Router()

import * as db from '../db/db'
import checkJwt, { JwtRequest } from '../auth0'

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

// TODO: fix this and Set.jsx - Getting malformed token error
// router.get('/set/:set/user', checkJwt, (req: JwtRequest, res) => {
router.get('/set/:set/user', (req: JwtRequest, res) => {
  // TODO: fix auth
  // const userId = req.auth?.sub
  const userId = 'auth0|64c2562d37faca9ac3e3b60d'

  if (!userId) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  db.getUsersCardsFromSet(req.params.set, userId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// router.post('/add/user', checkJwt, (req: JwtRequest, res) => {
router.post('/add/user', (req: JwtRequest, res) => {
  // TODO: fix auth
  // const userId = req.auth?.sub
  const userId = 'auth0|64c2562d37faca9ac3e3b60d'

  if (!userId) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  const { cardId, normal, foil } = req.body
  const userCard = {
    card_id: cardId,
    quantity: normal,
    foil_quantity: foil,
    user_id: userId,
  } as UserCard

  db.checkUserCardExists(cardId, userId)
    .then((alreadyOwned) => alreadyOwned ? db.updateUserCard(userCard) : db.addCardToUser(userCard))
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

export default router
