const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getCards () {
    return db('cards')
}

function getCardById (id) {
    return db('cards')
        .where('id', id)
        .first()
}

function getCardsFromSet (set) {
    return db('cards')
        .where('set_name', set)
}

function getSets () {
    return db('sets')
}

module.exports = {
    getCards,
    getCardById,
    getCardsFromSet,
    getSets
}