const request = require('superagent')

const fields = [
  'card_faces', // object
  'cmc', // integer
  'collector_number', // integer
  'color_identity',
  'colors',
  'edhrec_rank', // integer
  'flavor_text',
  'id',
  'image_uris', // object
  'layout',
  'loyalty',
  'mana_cost',
  'name',
  'oracle_text',
  'power', // integer
  'prices', // object
  'rarity',
  'scryfall_uri',
  'set',
  'set_name',
  'set_uri',
  'toughness', // integer
  'type_line',
  'uri',
]
const numberFields = [
  'cmc',
  'collector_number',
  'edhrec_rank',
  'power',
  'toughness',
]

let db = null
let arr = []

module.exports = fillDb

function fillDb(connection) {
  db = connection
  // TODO: update request to current scryfall version
  console.log('Requesting cards from Scryfall...')
  return doRequest('https://api.scryfall.com/cards')
    .catch((err) => {
      console.log('CARD ERROR:', err.message)
      console.log(' - Using default cards')
      arr = pruneData(require('./scryfall-cards.json'))
      return
    })
    .then(() => loopIn(0))
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
    .filter(card => card.set_type == 'core' || card.set_type == 'expansion')
    .map((card) => {
      let obj = {}

      Object.keys(card).forEach((key) => {
        if (key === 'collector_number') {
          const isNumber = (char) => /^\d+$/.test(char)
          const chars = card.collector_number.split('')
          const nums = chars.filter(isNumber)
          
          obj.full_collector_number = chars.length !== nums.length ? card.collector_number : null
          obj.collector_number = Number(nums.join(''))
          
        } else if (numberFields.includes(key)) {
          obj[key] = Number(card[key])
        } else if (fields.includes(key)) {
          if(typeof card[key] == 'object') {
            obj[key] = JSON.stringify(card[key])
          } else {
            obj[key] = card[key]
          }
        }
      })

      return obj
    })
}

// TODO: this way of inserting cards is slow (30,000+ cards)
// find a way to insert many at once that doesn't break the computer, lol
function loopIn(i) {
  if (i < arr.length) {
    return db('cards')
      .insert(arr[i])
      .then(() => loopIn(i + 1))
  }
}
