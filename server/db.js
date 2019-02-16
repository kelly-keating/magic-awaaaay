const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getCards () {
    return db('cards')
}

module.exports = {
    getCards
}