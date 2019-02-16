
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cards', function (table) {
        table.string('id')
        table.string('name')
        table.string('card_faces')
        table.string('cmc')
        table.string('collector_number')
        table.string('color_identity')
        table.string('colors')
        table.string('edhrec_rank')
        table.string('flavor_text')
        table.string('image_uris')
        table.string('layout')
        table.string('loyalty')
        table.string('mana_cost')
        table.string('oracle_text')
        table.string('power')
        table.string('rarity')
        table.string('scryfall_uri')
        table.string('set')
        table.string('set_name')
        table.string('set_uri')
        table.string('tcgplayer_id')
        table.string('toughness')
        table.string('type_line')
        table.string('uri')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards')
};
