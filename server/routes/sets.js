var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', (req, res) => {
  db.getSets()
    .then((result) => res.json(result))
})

module.exports = router
