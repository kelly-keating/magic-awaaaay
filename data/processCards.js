const fields = [
    'card_faces',
    'cmc',
    'collector_number',
    'color_identity',
    'colors',
    'edhrec_rank',
    'flavor_text',
    'id',
    'image_uris',
    'layout',
    'loyalty',
    'mana_cost',
    'name',
    'oracle_text',
    'power',
    'rarity',
    'scryfall_uri',
    'set',
    'set_name',
    'set_uri',
    'tcgplayer_id',
    'toughness',
    'type_line',
    'uri'
]


const all = require('./scryfall-cards')

var fs = require('fs');

let arr = all.filter(card => card.lang == "en")

arr = arr.map(card => {
    let keys = Object.keys(card)
    let obj = {}

    keys.forEach(key => {
        if (fields.includes(key)){
            obj[key] = (typeof card[key] == "object") ? JSON.stringify(card[key]) : card[key]
        }
    })
    
    return obj
});


const knex = require('knex')
const config = require('../knexfile').development
const db = knex(config)

function loopIn (i) {
    if(i >= arr.length) db.destroy()
    else {
        db('cards').insert(arr[i])
            .then(() => loopIn(i+1))
    }
}

function reseed() {
    db('cards').delete()
        .then(() => loopIn(0))
}

reseed()