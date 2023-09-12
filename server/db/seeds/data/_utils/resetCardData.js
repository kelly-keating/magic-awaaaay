const pruneCardData = require('./pruneCards')
const simpleCards = pruneCardData(require('./scryfall-cards.json'))

const fs = require('node:fs/promises')
const path = require('node:path')

async function resetCardsFolder() {
  const destinationDir = path.join(__dirname, '../cards')
  await fs.rmdir(destinationDir, { recursive: true, force: true })
  await fs.mkdir(destinationDir)
  
  let i = 0
  while (simpleCards.length) {
    const cards = simpleCards.splice(0, 100)
    const num = String(i++)
    const filename = `cards${"0".repeat(3 - num.length) + num}.json`
    const destination = path.join(destinationDir, filename)

    fs.writeFile(destination, JSON.stringify(cards, null, 2))
      .then(() => console.log(filename, '- DONE!'))
      .catch((err) => console.log(err.message))
  }
}

resetCardsFolder()

// const destination = path.join(__dirname, '../cards.json')
// fs.writeFile(destination, JSON.stringify(simpleCards, null, 2))
//   .then(() => console.log('DONE!'))
//   .catch((err) => console.log(err.message))
