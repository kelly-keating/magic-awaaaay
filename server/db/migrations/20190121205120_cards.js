exports.up = (knex) => {
  return knex.schema.createTable('cards', (table) => {
    table.string('id')
    table.string('name')
    table.string('card_faces')
    table.integer('cmc')
    table.integer('collector_number')
    table.string('full_collector_number')
    table.string('color_identity')
    table.string('colors')
    table.integer('edhrec_rank')
    table.string('flavor_text')
    table.string('image_uris')
    table.string('layout')
    table.string('loyalty')
    table.string('mana_cost')
    table.string('oracle_text')
    table.integer('power')
    table.string('prices')
    table.string('rarity')
    table.string('scryfall_uri')
    table.string('set')
    table.string('set_name')
    table.string('set_uri')
    table.integer('toughness')
    table.string('type_line')
    table.string('uri')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('cards')
}
