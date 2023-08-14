import checkJwt, { JwtRequest } from '../auth0'
import { UserCard } from '../../models/cards'
import { Router } from 'express'
const router = Router()

import * as db from '../db/db'

router.get('/', (req, res) => {
  db.getRandomCards()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.get('/single/:id', (req, res) => {
  db.getCardById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// router.get('/user', checkJwt, (req: JwtRequest, res) => {
router.get('/user', (req: JwtRequest, res) => {
  // TODO: fix auth
  // const userId = req.auth?.sub
  const userId = 'auth0|64c2562d37faca9ac3e3b60d'

  if (!userId) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  db.getAllCardInfoForUser(userId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// router.post('/add/user', checkJwt, (req: JwtRequest, res) => {
router.post('/user', (req: JwtRequest, res) => {
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

router.get('/search/:query', (req, res) => {
  // TODO: fix auth
  // const userId = req.auth?.sub
  const userId = 'auth0|64c2562d37faca9ac3e3b60d'

  console.log(req.query)
  const conditions = {
    unowned: req.query.unowned === 'true',
    excludeLand: req.query.excludeLand === 'true',
    rarity: req.query.rarity as string,
    colors: (req.query.colors as string)?.split(','),
    sets: (req.query.sets as string)?.split(','),
    types: (req.query.types as string)?.split(','),
  }
  db.searchCards(req.params.query, conditions, userId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

export default router
