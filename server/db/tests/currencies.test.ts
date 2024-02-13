import { expect, test } from 'vitest'
import './_config'

import { getAllOwnedCards, getCurrencies, updateCurrencies } from '../db'

test('getCurrencies', async () => {
  const currencies = await getCurrencies()
  expect(currencies).toEqual({
    usd: 1.6372302987152139,
    eur: 1.8024418836644713,
    date: 'Mon Aug 07 2023 18:08:05 GMT+1200 (New Zealand Standard Time)',
  })
})

test('getAllOwnedCards', async () => {
  const cards = await getAllOwnedCards()
  expect(cards).toHaveLength(3)

  expect(cards[0].name).toBe('Razorfoot Griffin')
  expect(cards[1].name).toBe('Narset, Parter of Veils')

  expect(cards[2].name).toEqual('Dingus Egg')
  expect(cards[2].id).toEqual('65eb6cda-e512-40a8-9c1f-335b713409ff')
})

test('updateCurrencies', async () => {
  const newCurrencies = {
    usd: 1.6,
    eur: 1.8,
    date: 'Mon Aug 07 2023 18:18:18 GMT+1200 (New Zealand Standard Time)',
  }

  await updateCurrencies(newCurrencies)
  const currencies = await getCurrencies()
  expect(currencies).toEqual(newCurrencies)
})
