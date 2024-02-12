exports.up = (knex) => {
  return knex.schema.alterTable('sets', (t) => {
    t.string('parent_set_code')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('sets', (t) => {
    t.dropColumn('parent_set_code')
  })
}
