module.exports = pruneSetData

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

function pruneSetData (all) {
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
