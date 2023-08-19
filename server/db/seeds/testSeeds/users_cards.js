/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users_cards').del()
  await knex('users_cards').insert([
    {
      id: 4,
      user_id: 'auth0|nonExistentUser',
      card_id: '21c950d7-b4f6-4902-8c9a-98f2933f9fa5',
      quantity: 1,
    },
    {
      id: 5,
      user_id: 'auth0|testUser',
      card_id: '9dc4d69c-f61d-4122-9e0b-c88aa905d159',
      quantity: 1,
    },
    {
      id: 7,
      user_id: 'auth0|testUser',
      card_id: '8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5',
      quantity: 4,
      foil_quantity: 1,
    },
    {
      id: 6,
      user_id: 'auth0|testUser',
      card_id: '65eb6cda-e512-40a8-9c1f-335b713409ff',
      foil_quantity: 10,
    },
  ])
}
