const request = require('superagent')
const pruneSetData = require('./_utils/pruneSets')

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
    .then(data => pruneSetData(data))
    .then(sets => loopIn(sets, 0))
    .then(() => console.log(' - Done!'))
}

function loopIn (arr, i) {
  if(i < arr.length) {
    return db('sets').insert(arr[i])
      .then(() => loopIn(arr, i + 1))
  }
}
