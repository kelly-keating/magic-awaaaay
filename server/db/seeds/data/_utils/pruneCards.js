module.exports = pruneCardData

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

function pruneCardData(all) {
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
