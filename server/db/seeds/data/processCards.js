// const request = require('superagent')
// const pruneCardData = require('./_utils/pruneCards')

module.exports = fillDb

let db = null
let arr = []

function fillDb(connection) {
  db = connection

  console.log('Requesting cards from Scryfall...')
  return doRequest('https://api.scryfall.com/cards')
    .catch((err) => {
      console.log('CARD ERROR:', err.message)
      console.log(' - Using default cards')
      arr = require('./cards.json')
    })
    .then(() => loopIn(0))
    .then(() => console.log(' - Done!'))
    .then(() => console.log('Total cards acquired: ' + arr.length))
}

function doRequest(url) {
  // TODO: url now broken - implement new api method
  return Promise.reject(new Error('scryfall api/url not fixed yet'))

  /*

  return request(url).then((res) => {
    let cards = pruneCardData(res.body.data)
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

  */
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
