const request = require('superagent')
const db = require('../server/db/connection')

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
    .catch((err) => console.log('SET ERROR:', err.message))
}

function reseed(data) {
  return db('sets').delete()
    .then(() => loopIn(data, 0))
}

function loopIn (arr, i) {
  if(i >= arr.length) {
    return db.destroy()
  } else {
    return db('sets').insert(arr[i])
      .then(() => loopIn(arr, i + 1))
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
