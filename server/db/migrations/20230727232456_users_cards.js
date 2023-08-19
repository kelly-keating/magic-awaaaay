exports.up = (knex) => {
  return knex.schema.createTable('users_cards', (table) => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('card_id') //.references('cards.id')
    table.integer('quantity').defaultTo(0)
    table.integer('foil_quantity').defaultTo(0)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users_cards')
}
