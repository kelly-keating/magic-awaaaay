import { JwtRequest } from '../auth0'
import { Router } from 'express'
const router = Router()

import * as db from '../db/db'

router.get('/', (req, res) => {
  db.getSets()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// TODO: all cards from set, other sets from block, sets on either side of block
router.get('/:set', (req, res) => {
  const { set } = req.params
  if (!set) {
    return res.status(400).json({ error: 'No set provided' })
  }

  db.getSetByName(set)
    .then((fullSet) => {
      if (!fullSet) {
        return res.status(404).json({ error: 'Set not found' })
      }

      return Promise.all([
        db.getCardsFromSet(set),
        db.getSetsFromBlock(fullSet.block),
        db.getNeighbouringSets(fullSet.released_at),
      ]).then(([cards, blockSets, neighbours]) =>
        res.json({
          set: fullSet,
          cards,
          blockSets,
          neighbours,
        }),
      )
    })
    .catch((err) => res.status(500).json({ error: err.message }))
})

// /api/v1/sets/:set/cards - get all users cards from set
// TODO: fix this and Set.jsx - Getting malformed token error
// router.get('/:set/user', checkJwt, (req: JwtRequest, res) => {
router.get('/:set/cards', (req: JwtRequest, res) => {
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

export default router
