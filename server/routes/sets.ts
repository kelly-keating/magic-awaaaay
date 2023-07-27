import { Router } from 'express'
const router = Router()

import * as db from '../db/db'

router.get('/', (req, res) => {
  db.getSets()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }))
})

export default router
