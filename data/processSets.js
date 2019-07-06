const request = require('superagent')
const knex = require('knex')
const config = require('../knexfile').development
const db = knex(config)

const fields = [
    'id',
    'code',
    'name',
    'block',
    'block_code',
    'card_count', //integer
    'icon_svg_uri',
    'released_at',
    'set_type',
    'uri'
]


function fillDb () {
    return request('https://api.scryfall.com/sets')
        .then(res => pruneData(res.body.data))
        .then(sets => reseed(sets))
}

function reseed(data) {
    db('sets').delete()
        .then(() => loopIn(data, 0))
}

function loopIn (arr, i) {
    if(i >= arr.length) db.destroy()
    else {
        db('sets').insert(arr[i])
            .then(() => loopIn(arr, i+1))
    }
}

function pruneData (all) {
    return all.filter(set => set.set_type == "core" || set.set_type == "expansion").map(set => {
        let obj = {}
    
        Object.keys(set).forEach(key => {
            if (fields.includes(key)){
                obj[key] = (typeof set[key] == "object") ? JSON.stringify(set[key]) : set[key]
            }
        })
        
        return obj
    })
}


fillDb()
