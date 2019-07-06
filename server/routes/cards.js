var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', (req, res) => {
  db.getCards()
    .then((result) => res.json(result))
})

router.get('/single/:id', (req, res) => {
  db.getCardById(req.params.id)
    .then((result) => res.json(result))
})

router.get('/set/:set', (req, res) => {
  db.getCardsFromSet(req.params.set)
    .then((result) => res.json(result))
})

module.exports = router
