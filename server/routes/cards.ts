import checkJwt, { JwtRequest } from '../auth0'
import { UserCard } from '../../models/cards'
import { Response, Router } from 'express'
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

router.get('/user', checkJwt, (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  if (!userId) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  db.getAllCardInfoForUser(userId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.post('/user', checkJwt, (req: JwtRequest, res) => {
  const userId = req.auth?.sub
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
    .then((alreadyOwned) =>
      alreadyOwned ? db.updateUserCard(userCard) : db.addCardToUser(userCard),
    )
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

router.get('/search/:query/loggedIn', checkJwt, searchRoute)
router.get('/search/:query', searchRoute)

function searchRoute(req: JwtRequest, res: Response) {
  const userId = req.auth?.sub || null
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
}

export default router
