import { expect, test } from 'vitest'
import './_config'

import {
  getNeighbouringSets,
  getSetByName,
  getSetsFromBlock,
  getSets,
} from '../db'

const firstSet = {
  id: '288bd996-960e-448b-a187-9504c1930c2c',
  code: 'lea',
  name: 'Limited Edition Alpha',
  uri: 'https://api.scryfall.com/sets/288bd996-960e-448b-a187-9504c1930c2c',
  released_at: '1993-08-05',
  set_type: 'core',
  card_count: 295,
  block_code: 'lea',
  block: 'Core Set',
  icon_svg_uri: 'https://svgs.scryfall.io/sets/lea.svg?1691985600',
}

const mostRecentSet = {
  id: '392f7315-dc53-40a3-a2cc-5482dbd498b3',
  code: 'mom',
  name: 'March of the Machine',
  uri: 'https://api.scryfall.com/sets/392f7315-dc53-40a3-a2cc-5482dbd498b3',
  released_at: '2023-04-21',
  set_type: 'expansion',
  card_count: 387,
  icon_svg_uri: 'https://svgs.scryfall.io/sets/mom.svg?1691985600',
  block: null,
  block_code: null,
}

test('getSets', async () => {
  const sets = await getSets()
  expect(sets).toHaveLength(64)
  expect(sets[0]).toEqual(firstSet)
  expect(sets[sets.length - 1]).toEqual(mostRecentSet)
})

test('getSetByName', async () => {
  const set = await getSetByName('Limited Edition Alpha')
  expect(set).toEqual(firstSet)

  const setTwo = await getSetByName('March of the Machine')
  expect(setTwo).toEqual(mostRecentSet) 
})

test('getSetByName - not found', async () => {
  const set = await getSetByName('Not a set')
  expect(set).toBeUndefined()
})

const recentCoreSet = {
  id: '4a787360-9767-4f44-80b1-2405dc5e39c7',
  code: 'm20',
  name: 'Core Set 2020',
  uri: 'https://api.scryfall.com/sets/4a787360-9767-4f44-80b1-2405dc5e39c7',
  released_at: '2019-07-12',
  set_type: 'core',
  card_count: 345,
  block_code: 'lea',
  block: 'Core Set',
  icon_svg_uri: 'https://svgs.scryfall.io/sets/m20.svg?1691985600',
}

test('getSetsFromBlock', async () => {
  const sets = await getSetsFromBlock('Core Set')
  expect(sets).toHaveLength(14)
  expect(sets[0]).toEqual(firstSet)
  expect(sets[sets.length - 1]).toEqual(recentCoreSet)

  const setsTwo = await getSetsFromBlock('Ixalan')
  expect(setsTwo).toHaveLength(1)
  expect(setsTwo[0].name).toBe('Rivals of Ixalan')
})

test('getSetsFromBlock - not found', async () => {
  const sets = await getSetsFromBlock('Not a block')
  expect(sets).toHaveLength(0)
})

test('getNeighbouringSets', async () => {
  const sets = await getNeighbouringSets('2017-04-28')
  const {before, after} = sets

  expect(before).toHaveLength(2)
  expect(before[0].name).toBe('Shadows over Innistrad')
  expect(before[1].name).toBe('Kaladesh')

  expect(after).toHaveLength(2)
  expect(after[0].name).toBe('Rivals of Ixalan')
  expect(after[1].name).toBe('Dominaria')
})

test('getNeighbouringSets - first set', async () => {
  const sets = await getNeighbouringSets('1993-08-05')
  const {before, after} = sets

  expect(before).toHaveLength(0)

  expect(after).toHaveLength(2)
  expect(after[0].name).toBe('Antiquities')
  expect(after[1].name).toBe('Revised Edition')
})
