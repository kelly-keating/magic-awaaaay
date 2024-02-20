import { describe, expect, it, test } from 'vitest'
import './_config'

import {
  addCardToUser,
  checkUserCardExists,
  getAllCardInfoForUser,
  getCardsByUserId,
  getUsersCards,
  getUsersCardsFromSet,
  updateUserCard,
} from '../db'

describe('checkUserCardExists', () => {
  it('returns TRUE if card is associated with that user', async () => {
    const user = 'auth0|testUser'
    const card = '65eb6cda-e512-40a8-9c1f-335b713409ff'

    const cardExists = await checkUserCardExists(card, user)
    expect(cardExists).toBeTruthy()
  })

  it('returns FALSE if card is not yet owned by user', async () => {
    const user = 'auth0|testUser'
    const card = 'card-that-does-not-exist-in-db'

    const cardExists = await checkUserCardExists(card, user)
    expect(cardExists).toBeFalsy()
  })
})

describe('getUsersCards', () => {
  it('returns empty object when user has no cards', async () => {
    const user = 'auth0|notAUser'
    const actual = await getUsersCards(user)
    expect(actual).toEqual({})
  })

  it('returns all users cards (ONE CARD)', async () => {
    const user = 'auth0|nonExistentUser'

    const cards = {
      '21c950d7-b4f6-4902-8c9a-98f2933f9fa5': { foil: 0, normal: 1 },
    }
    const actual = await getUsersCards(user)
    expect(actual).toEqual(cards)
  })

  it('returns all users cards (MANY CARDS)', async () => {
    const user = 'auth0|testUser'

    const cards = {
      '65eb6cda-e512-40a8-9c1f-335b713409ff': { foil: 10, normal: 0 },
      '8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5': { foil: 1, normal: 4 },
      '9dc4d69c-f61d-4122-9e0b-c88aa905d159': { foil: 0, normal: 1 },
    }
    const actual = await getUsersCards(user)
    expect(actual).toEqual(cards)
  })
})

describe('getUsersCardsFromSet', () => {
  it('successfully accesses user cards by set name', async () => {
    const user = 'auth0|testUser'
    // BUG: should this be set code rather than set name?
    const set = 'Magic 2010'
    const cards = {
      '9dc4d69c-f61d-4122-9e0b-c88aa905d159': { foil: 0, normal: 1 },
    }

    const actual = await getUsersCardsFromSet(set, user)
    expect(actual).toEqual(cards)
  })

  it('returns an empty object when no user cards are from that set', async () => {
    const user = 'auth0|testUser'
    const set = 'Magic 2099'
    const cards = {}

    const actual = await getUsersCardsFromSet(set, user)
    expect(actual).toEqual(cards)
  })
})

describe('getCardsByUserId', () => {
  it('returns empty object for user with no cards', async () => {
    const user = 'notAUser'
    const cards = await getCardsByUserId(user)

    expect(cards).toEqual([])
  })

  it('returns empty object for user with no cards', async () => {
    const user = 'auth0|testUser'
    const cards = await getCardsByUserId(user)

    expect(cards).toHaveLength(3)
    expect(cards[0].name).toBe('Razorfoot Griffin')
    expect(cards[1].name).toBe('Dingus Egg')
    expect(cards[2].name).toBe('Narset, Parter of Veils')

    expect(cards[0]).toEqual({ id: '9dc4d69c-f61d-4122-9e0b-c88aa905d159', name: 'Razorfoot Griffin', cmc: 4, collector_number: 25, full_collector_number: null, colors: '["W"]', edhrec_rank: 17173, flavor_text: 'Like a meteor, it strikes from above without warning. Unlike a meteor, it then carries you off and eats you.', layout: 'normal', loyalty: null, mana_cost: '{3}{W}', oracle_text: "Flying (This creature can't be blocked except by creatures with flying or reach.)\nFirst strike (This creature deals combat damage before creatures without first strike.)", power: 2, rarity: 'common', scryfall_uri: 'https://scryfall.com/card/m10/25/razorfoot-griffin?utm_source=api', set: 'm10', set_name: 'Magic 2010', set_uri: 'https://api.scryfall.com/sets/0dba38a9-6b9d-4768-9831-4e03e8970a0b', toughness: 2, type_line: 'Creature — Griffin', uri: 'https://api.scryfall.com/cards/9dc4d69c-f61d-4122-9e0b-c88aa905d159', card_faces: null, color_identity: ['W'], image_uris: { small: 'https://cards.scryfall.io/small/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.jpg?1561990173', normal: 'https://cards.scryfall.io/normal/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.jpg?1561990173', large: 'https://cards.scryfall.io/large/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.jpg?1561990173', png: 'https://cards.scryfall.io/png/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.png?1561990173', art_crop: 'https://cards.scryfall.io/art_crop/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.jpg?1561990173', border_crop: 'https://cards.scryfall.io/border_crop/front/9/d/9dc4d69c-f61d-4122-9e0b-c88aa905d159.jpg?1561990173' }, prices: { usd: '0.02', usd_foil: '0.28', usd_etched: null, eur: '0.02', eur_foil: '0.08', tix: '0.03' } })
  })
})

describe('getAllCardInfoForUser', () => {
  it('returns correct format for empty user', async () => {
    const user = 'notAUser'
    const expected = {
      cards: [],
      userCards: {},
    }

    const actual = await getAllCardInfoForUser(user)

    expect(actual).toEqual(expected)
  })

  it('returns all details for existing user', async () => {
    const user = 'auth0|testUser'
    const { userCards, cards } = await getAllCardInfoForUser(user)

    expect(userCards).toEqual({
      '9dc4d69c-f61d-4122-9e0b-c88aa905d159': { normal: 1, foil: 0 },
      '65eb6cda-e512-40a8-9c1f-335b713409ff': { normal: 0, foil: 10 },
      '8c39f9b4-02b9-4d44-b8d6-4fd02ebbb0c5': { normal: 4, foil: 1 },
    })

    expect(cards).toHaveLength(3)
    expect(cards[0].name).toBe('Razorfoot Griffin')
    expect(cards[1].name).toBe('Dingus Egg')
    expect(cards[2].name).toBe('Narset, Parter of Veils')

    expect(cards[1]).toEqual({ id: '65eb6cda-e512-40a8-9c1f-335b713409ff', name: 'Dingus Egg', cmc: 4, collector_number: 241, full_collector_number: null, colors: '[]', edhrec_rank: 11121, flavor_text: null, layout: 'normal', loyalty: null, mana_cost: '{4}', oracle_text: "Whenever a land is put into a graveyard from the battlefield, Dingus Egg deals 2 damage to that land's controller.", power: null, rarity: 'rare', scryfall_uri: 'https://scryfall.com/card/lea/241/dingus-egg?utm_source=api', set: 'lea', set_name: 'Limited Edition Alpha', set_uri: 'https://api.scryfall.com/sets/288bd996-960e-448b-a187-9504c1930c2c', toughness: null, type_line: 'Artifact', uri: 'https://api.scryfall.com/cards/65eb6cda-e512-40a8-9c1f-335b713409ff', card_faces: null, color_identity: [], image_uris: { art_crop: 'https://cards.scryfall.io/art_crop/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.jpg?1559591600', border_crop: 'https://cards.scryfall.io/border_crop/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.jpg?1559591600', large: 'https://cards.scryfall.io/large/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.jpg?1559591600', normal: 'https://cards.scryfall.io/normal/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.jpg?1559591600', png: 'https://cards.scryfall.io/png/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.png?1559591600', small: 'https://cards.scryfall.io/small/front/6/5/65eb6cda-e512-40a8-9c1f-335b713409ff.jpg?1559591600' }, prices: { eur: '399.00', eur_foil: null, tix: null, usd: null, usd_etched: null, usd_foil: null } })
  })
})

describe('addCardToUser', () => {
  it("returns the user's card with all details", async () => {
    const newCard = {
      user_id: 'testUser',
      card_id: '1234567890',
      foil_quantity: 1,
      quantity: 4,
    }
    const fullUserCard = { ...newCard, id: 8 }

    const actual = await addCardToUser(newCard)
    expect(actual).toEqual(fullUserCard)
  })

  it('actually adds the record to the database', async () => {
    const newCard = {
      user_id: 'testUser2',
      card_id: '0987654321',
      foil_quantity: 0,
      quantity: 1,
    }
    const fullUserCard = { ...newCard, id: 9 }

    const startCards = await getUsersCards('testUser2')
    expect(startCards).toEqual({})

    const actual = await addCardToUser(newCard)
    expect(actual).toEqual(fullUserCard)

    const endCards = await getUsersCards('testUser2')
    expect(endCards).toEqual({
      '0987654321': { normal: 1, foil: 0 },
    })
  })
})

describe('updateUserCard', () => {
  it('returns the new card information', async () => {
    const newDetails = {
      user_id: 'auth0|nonExistentUser',
      card_id: '21c950d7-b4f6-4902-8c9a-98f2933f9fa5',
      quantity: 100,
      foil_quantity: -1,
    }
    const expectedResult = { ...newDetails, id: 4 }

    const returnedCard = await updateUserCard(newDetails)
    expect(returnedCard).toEqual(expectedResult)
  })

  it('successfully updates the user card', async () => {
    const newDetails = {
      user_id: 'auth0|testUser',
      card_id: '9dc4d69c-f61d-4122-9e0b-c88aa905d159',
      quantity: 2,
      foil_quantity: 0,
    }
    const expectedResult = { ...newDetails, id: 5 }

    const startCards = await getUsersCards('auth0|testUser')
    const returnedCard = await updateUserCard(newDetails)
    const endCards = await getUsersCards('auth0|testUser')

    expect(returnedCard).toEqual(expectedResult)
    expect(endCards).not.toEqual(startCards)

    Object.keys(startCards).forEach((id) => {
      if (id === '9dc4d69c-f61d-4122-9e0b-c88aa905d159') {
        expect(endCards[id]).not.toEqual(startCards[id])
      } else {
        expect(endCards[id]).toEqual(startCards[id])
      }
    })
  })
})
