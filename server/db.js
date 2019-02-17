const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getCards () {
    return db('cards')
}

function getCardsFromSet (set) {
    return db('cards')
        .where('set', set)
}

function getSets () {
    return db('sets')
}

module.exports = {
    getCards,
    getCardsFromSet,
    getSets
}