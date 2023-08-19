const fillDb = require("./data/processSets")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('sets').del()
  await fillDb(knex)
}
