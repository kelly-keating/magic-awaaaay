// const request = require('superagent')
// const pruneCardData = require('./_utils/pruneCards')
const fs = require('node:fs/promises')
const path = require('node:path')

module.exports = fillDb

let db = null
// let arr = []

function fillDb(connection) {
  db = connection

  console.log('Requesting cards from Scryfall...')
  console.log(' - Using default cards')

  const cardsDir = path.join(__dirname, 'cards')
  return fs.readdir(cardsDir)
    .then(async (files) => {
      // in smaller files so as not to bust fly.io's memory limit
      while(files.length) {
        const file = files.shift()
        const cards = require(path.join(cardsDir, file))
        await db('cards').insert(cards)
      }
    })
    .then(() => db('cards'))
    .then((res) => console.log('Total cards acquired:', res.length))
    .then(() => console.log(' - Done!'))
    .catch((err) => console.log('CARD ERROR:', err.message))

  
  // console.log('Requesting cards from Scryfall...')
  // return doRequest('https://api.scryfall.com/cards')
  //   .catch((err) => {
  //     console.log('CARD ERROR:', err.message)
  //     console.log(' - Using default cards')
      // arr = require('./cards.json')
      // loopIn(0)
    // })
    // .then(() => loopIn(0))
    // .then(() => console.log(' - Done!'))
    // .then(() => console.log('Total cards acquired: ' + arr.length))
}

// function doRequest(url) {
//   // TODO: url now broken - implement new api method
//   return Promise.reject(new Error('scryfall api/url not fixed yet'))

//   /*

//   return request(url).then((res) => {
//     let cards = pruneCardData(res.body.data)
//     arr.push(...cards)
//     if (res.body.has_more) {
//       let next = res.body.next_page

//       process.stdout.clearLine() // clear current text
//       process.stdout.cursorTo(0) // move cursor to beginning of line
//       process.stdout.write(
//         'Request ' +
//           next.split('=')[1] +
//           '/' +
//           Math.ceil(res.body.total_cards / 175),
//       )

//       return doRequest(next)
//     }
//   })

//   */
// }

// // TODO: this way of inserting cards is slow (30,000+ cards)
// // find a way to insert many at once that doesn't break the computer, lol
async function loopIn(arr, i) {
  if (i < arr.length) {
    console.log('loop', i, 'of', arr.length)
    await db('cards').insert(arr[i])
    await loopIn(i + 1)
  }
}
