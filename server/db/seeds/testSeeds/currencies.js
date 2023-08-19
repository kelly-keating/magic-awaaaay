/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('currencies').del()
  await knex('currencies').insert([
    {
      usd: '1.6372302987152139',
      eur: '1.8024418836644713',
      date: 'Mon Aug 07 2023 18:08:05 GMT+1200 (New Zealand Standard Time)',
    },
  ])
}
