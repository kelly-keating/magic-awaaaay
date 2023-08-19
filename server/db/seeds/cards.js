const fillDb = require('./data/processCards')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('cards').del()
  await fillDb(knex)
}
