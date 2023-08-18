import checkJwt, { JwtRequest } from '../auth0'
import { Router } from 'express'
const router = Router()

import * as db from '../db/db'

router.get('/', (req, res) => {
  db.getSets()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

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

router.get('/:set/user-cards', checkJwt, (req: JwtRequest, res) => {
  const userId = req.auth?.sub
  if (!userId) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  db.getUsersCardsFromSet(req.params.set, userId)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

export default router
