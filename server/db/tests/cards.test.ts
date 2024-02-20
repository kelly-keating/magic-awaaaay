import { describe, expect, it, test } from 'vitest'
import './_config'

import {
  getCardById,
  getCardsFromSet,
  getRandomCards,
  updateCardPrices,
} from '../db'

const balefireDragon = {
  id: 'b0dce4ac-f472-4f3b-b01a-eff0902a578f',
  name: 'Balefire Dragon',
  set_name: 'Innistrad',
  collector_number: 129,
}

const ludevicsPet = {
  id: 'ebf5e16f-a8bd-419f-b5ca-8c7fce09c4f1',
  name: "Ludevic's Test Subject // Ludevic's Abomination",
  set_name: 'Innistrad',
  collector_number: 64,
}

describe('getCardById', () => {
  it('normal card', async () => {
    const card = await getCardById('b0dce4ac-f472-4f3b-b01a-eff0902a578f')
    expect(card).toMatchObject(balefireDragon)
  })

  it('invalid id', async () => {
    const card = await getCardById('invalid')
    expect(card).toBeUndefined()
  })
})

test('getCardsFromSet', async () => {
  const cards = await getCardsFromSet('Innistrad')
  expect(cards).toHaveLength(2)
  expect(cards[0]).toMatchObject(ludevicsPet)
  expect(cards[1]).toMatchObject(balefireDragon)
})

test('getCardsFromSet - invalid set', async () => {
  const cards = await getCardsFromSet('invalid')
  expect(cards).toHaveLength(0)
})

test('getRandomCards', async () => {
  const cards = await getRandomCards()
  expect(cards).toHaveLength(101)

  const cardOne = cards[0]
  const cardTwo = (await getRandomCards())[0]
  const cardThree = (await getRandomCards())[0]

  // double to account for randomness
  const oneDoesNotMatchTwo = cardOne.name !== cardTwo.name
  const oneDoesNotMatchThree = cardOne.name !== cardThree.name

  expect(oneDoesNotMatchTwo || oneDoesNotMatchThree).toBe(true)
})

test('updateCardPrices', async () => {
  const dragonId = 'b0dce4ac-f472-4f3b-b01a-eff0902a578f'

  const card = await getCardById(dragonId)
  expect(card?.prices).toEqual({
    eur: '20.35',
    eur_foil: '33.00',
    tix: '0.02',
    usd: '23.44',
    usd_etched: null,
    usd_foil: '52.44',
  })

  await updateCardPrices(
    dragonId,
    JSON.stringify({
      usd: '1.23',
      eur: '1.23',
      tix: '1.23',
      usd_foil: '100.23',
      eur_foil: '100.23',
    }),
  )

  const updatedCard = await getCardById(dragonId)
  expect(updatedCard?.prices).toEqual({
    usd: '1.23',
    eur: '1.23',
    tix: '1.23',
    usd_foil: '100.23',
    eur_foil: '100.23',
  })
})
