const request = require('superagent')
const db = require('../server/db/connection')

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
  'uri',
]

let arr = []

function fillDb() {
  return doRequest('https://api.scryfall.com/cards')
    .then(() => reseed())
    .catch((err) => {
      console.log('CARD ERROR:', err.message)
      console.log(' - Using default cards')
      arr = pruneData(require('./scryfall-cards.json'))
      return reseed()
    })
    .then(() => console.log(' - Done!'))
    .then(() => console.log('Total cards acquired: ' + arr.length))
}

function doRequest(url) {
  return request(url).then((res) => {
    let cards = pruneData(res.body.data)
    arr.push(...cards)
    if (res.body.has_more) {
      let next = res.body.next_page

      process.stdout.clearLine() // clear current text
      process.stdout.cursorTo(0) // move cursor to beginning of line
      process.stdout.write(
        'Request ' +
          next.split('=')[1] +
          '/' +
          Math.ceil(res.body.total_cards / 175),
      )

      return doRequest(next)
    }
  })
}

function pruneData(all) {
  return all
    .filter(
      (card) =>
        (card.set_type == 'core' || card.set_type == 'expansion') &&
        card.lang == 'en',
    )
    .map((card) => {
      let obj = {}

      Object.keys(card).forEach((key) => {
        if (fields.includes(key)) {
          obj[key] =
            typeof card[key] == 'object' ? JSON.stringify(card[key]) : card[key]
        }
      })

      return obj
    })
}

function reseed() {
  return db('cards')
    .delete()
    .then(() => Promise.all(arr.map(card => db('cards').insert(card))))
    .then(() => db.destroy())
}

// function loopIn(i) {
//   if (i >= arr.length) {
//     db.destroy()
//   } else {
//     return db('cards')
//       .insert(arr[i])
//       .then(() => loopIn(i + 1))
//   }
// }

fillDb()
