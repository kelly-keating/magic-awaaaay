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

describe('addCardToUser', () => {
  it('returns the user\'s card with all details', async () => {
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
      '0987654321': { normal: 1, foil: 0 }
    })
  })
})

test.todo('updateUserCard')
test.todo('getAllCardInfoForUser')
test.todo('getCardsByUserId')
