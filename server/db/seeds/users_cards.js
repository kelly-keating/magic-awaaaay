/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users_cards').del()
  await knex('users_cards').insert([
    { id: 1, user_id: 'auth0|64c2562d37faca9ac3e3b60d', card_id: "4e8eb264-dadb-440c-af85-273e755f1db6", quantity: 1 },
    { id: 2, user_id: 'auth0|64c2562d37faca9ac3e3b60d', card_id: "3b9d72a8-8acf-42c6-8adf-cbaecb4a985a", quantity: 1 },
    { id: 3, user_id: 'auth0|64c2562d37faca9ac3e3b60d', card_id: "c3e3b6c5-fd30-4d45-a122-ce60d5707357", quantity: 2, foil_quantity: 1 },
    { id: 4, user_id: 'auth0|nonExistentUser', card_id: "21c950d7-b4f6-4902-8c9a-98f2933f9fa5", quantity: 1 },
  ])
}
