const pruneCardData = require('./pruneCards')
const simpleCards = pruneCardData(require('./scryfall-cards.json'))

const fs = require('node:fs/promises')
const path = require('node:path')

const destination = path.join(__dirname, '../cards.json')
fs.writeFile(destination, JSON.stringify(simpleCards, null, 2))
  .then(() => console.log('DONE!'))
  .catch((err) => console.log(err.message))
