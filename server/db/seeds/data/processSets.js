const request = require('superagent')

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

// TODO: find a way to include other sets in components
// e.g. - code: 'ltr', name: 'The Lord of the Rings: Tales of Middle-earth',

module.exports = fillDb

let db = null

function fillDb (connection) {
  db = connection
  console.log('Requesting sets from Scryfall...')
  return request('https://api.scryfall.com/sets')
    .then(res => res.body.data)
    .catch((err) => {
      console.log('SET ERROR:', err.message)
      console.log(' - Using default sets')
      return require('./scryfall-sets.json')
    })
    .then(data => pruneData(data))
    .then(sets => loopIn(sets, 0))
    .then(() => console.log(' - Done!'))
}

function loopIn (arr, i) {
  if(i < arr.length) {
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
