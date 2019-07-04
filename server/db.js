const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getCards () {
    return db('cards')
}

function getCardsFromSet (set) {
    return db('cards')
        .where('set_name', set)
}

function getSets () {
    return db('sets')
        .where('set_type', 'expansion')
        .orWhere('set_type', 'core')

}

module.exports = {
    getCards,
    getCardsFromSet,
    getSets
}