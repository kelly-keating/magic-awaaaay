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


const all = require('./scryfall-sets')

var fs = require('fs');

arr = all.map(set => {
    let keys = Object.keys(set)
    let obj = {}

    keys.forEach(key => {
        if (fields.includes(key)){
            obj[key] = (typeof set[key] == "object") ? JSON.stringify(set[key]) : set[key]
        }
    })
    
    return obj
});


// const knex = require('knex')
// const config = require('../knexfile').development
// const db = knex(config)

// function loopIn (i) {
//     if(i >= arr.length) db.destroy()
//     else {
//         db('sets').insert(arr[i])
//             .then(() => loopIn(i+1))
//     }
// }

// loopIn(0)