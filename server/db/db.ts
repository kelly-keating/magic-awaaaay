import { Knex } from 'knex'
import {
  Card,
  CardCounts,
  Currencies,
  QueryData,
  UserCard,
} from '../../models/cards'
import { Neighbours, OneSideNeighbours, Set } from '../../models/sets'

import db from './connection'
import { condenseUserCards, prepCardForClient } from './utils'

// CURRENT PRICES

export function getCurrencies(): Promise<Currencies> {
  return db('currencies')
    .first()
    .then(({ usd, eur, date }) => ({
      usd: Number(usd),
      eur: Number(eur),
      date,
    }))
}

export function updateCurrencies(currencies: Currencies): Promise<void> {
  const { usd, eur, date } = currencies
  return db('currencies').update({
    usd: String(usd),
    eur: String(eur),
    date,
  })
}

export function updateCardPrices(id: string, prices: string): Promise<number> {
  return db('cards').update({ prices }).where('id', id)
}

// CARDS

// get random assortment of 100 cards
export function getRandomCards(): Promise<Card[]> {
  return db('cards')
    .orderByRaw('RANDOM()')
    .limit(101)
    .then((cards) => cards.map(prepCardForClient))
}

export function getAllOwnedCards(): Promise<Card[]> {
  return db('cards')
    .select('cards.*')
    .join('users_cards', 'users_cards.card_id', 'cards.id')
}

export function getCardsByUserId(userId: string): Promise<Card[]> {
  return db('cards')
    .select('cards.*')
    .join('users_cards', 'users_cards.card_id', 'cards.id')
    .where('users_cards.user_id', userId)
    .then((cards) => cards.map(prepCardForClient))
}

export function getCardById(id: string): Promise<Card | undefined> {
  return db('cards')
    .where('id', id)
    .first()
    .then((card) => (card ? prepCardForClient(card) : undefined))
}

export function getCardsFromSet(set: string): Promise<Card[]> {
  return db('cards')
    .where('set_name', set)
    .orderBy(['collector_number', 'full_collector_number'])
    .then((cards) => cards.map(prepCardForClient))
}

interface AllCardInfo {
  cards: Card[]
  userCards: CardCounts
}
export function getAllCardInfoForUser(userId: string): Promise<AllCardInfo> {
  return Promise.all([getCardsByUserId(userId), getUsersCards(userId)])
    .then(([cards, userCards]) => ({ cards, userCards }))
}

export function searchCards(
  query: string,
  conditions: QueryData,
  userId: string | null,
): Promise<Card[]> {
  const {
    sets,
    colors,
    types,
    rarity,
    excludeLand,
    unowned,
    includeDescription,
  } = conditions

  const cardMatchesQuery = (qB: Knex.QueryBuilder) =>
    qB
      .where('name', 'like', `%${query}%`)
      .orWhere('set', 'like', `%${query}%`)
      .orWhere('set_name', 'like', `%${query}%`)
      .orWhere('collector_number', 'like', `%${query}%`)
      .orWhere('full_collector_number', 'like', `%${query}%`)
      .orWhere('type_line', 'like', `%${query}%`)
      .orWhere('card_faces', 'like', `%${query}%`)

  const hasColors = (qB: Knex.QueryBuilder) => {
    if (colors) {
      const colorKeys = {
        red: 'R',
        white: 'W',
        blue: 'U',
        black: 'B',
        green: 'G',
        colorless: '[]',
      } as Record<string, string>

      const cols = colors.map((color) => colorKeys[color])
      cols.forEach((color) => {
        qB.orWhere('colors', 'like', `%${color}%`)
      })
    }
  }

  const isType = (qB: Knex.QueryBuilder) => {
    if (types) {
      types.forEach((type) => {
        qB.orWhere('type_line', 'like', `%${type}%`)
      })
    }
  }

  const queryBuilder = db('cards').limit(200)

  if (query !== 'allCards') {
    queryBuilder.where(cardMatchesQuery)
  }
  if (colors) {
    queryBuilder.where(hasColors)
  }
  if (types) {
    queryBuilder.where(isType)
  }
  if (rarity) {
    queryBuilder.where('rarity', rarity)
  }
  if (sets?.length) {
    queryBuilder.whereIn('set', sets)
  }
  if (excludeLand) {
    queryBuilder.whereNot('type_line', 'like', '%Land%')
  }
  if (includeDescription) {
    queryBuilder.orWhere('oracle_text', 'like', `%${query}%`)
    queryBuilder.orWhere('flavor_text', 'like', `%${query}%`)
  }
  if (userId && unowned) {
    queryBuilder.whereNotExists(function () {
      this.select('*')
        .from('users_cards')
        .where('user_id', userId)
        .whereRaw('users_cards.card_id = cards.id')
    })
  }

  return queryBuilder.then((cards) => cards.map(prepCardForClient))
}

// USERS_CARDS

export function getUsersCards(userId: string): Promise<CardCounts> {
  return db('users_cards').where('user_id', userId).then(condenseUserCards)
}

export function getUsersCardsFromSet(
  set: string,
  userId: string,
): Promise<CardCounts> {
  return db('users_cards')
    .select('users_cards.*')
    .join('cards', 'cards.id', 'users_cards.card_id')
    .where('set_name', set)
    .andWhere('users_cards.user_id', userId)
    .then(condenseUserCards)
}

export function addCardToUser(newCard: UserCard): Promise<UserCard> {
  return db('users_cards')
    .insert(newCard)
    .returning('*')
    .then((result) => result[0])
}

export function updateUserCard(card: UserCard): Promise<UserCard> {
  return db('users_cards')
    .where('card_id', card.card_id)
    .andWhere('user_id', card.user_id)
    .update(card)
    .returning('*')
    .then((result) => result[0])
}

export function checkUserCardExists(
  cardId: string,
  userId: string,
): Promise<boolean> {
  return db('users_cards')
    .where('card_id', cardId)
    .andWhere('user_id', userId)
    .first()
    .then((result) => Boolean(result))
}

// SETS

export function getSets(): Promise<Set[]> {
  return db('sets').orderBy('released_at')
}

export function getSetByName(name: string): Promise<Set | undefined> {
  return db('sets').where('name', name).first()
}

function getTwoNeighbours(
  released_at: string,
  direction: 'before' | 'after',
): Promise<OneSideNeighbours> {
  return db('sets')
    .where('released_at', direction === 'before' ? '<' : '>', released_at)
    .orderBy('released_at', direction === 'before' ? 'desc' : 'asc')
    .limit(2)
    .then((result) => {
      return {
        near: result[0] || null,
        far: result[1] || null,
      }
    })
}

export function getSetsFromBlock(blockName: string | null): Promise<Set[]> {
  return db('sets').where('block', blockName).orderBy('released_at')
}

export function getNeighbouringSets(releasedAt: string): Promise<Neighbours> {
  return Promise.all([
    getTwoNeighbours(releasedAt, 'before'),
    getTwoNeighbours(releasedAt, 'after'),
  ]).then(([before, after]) => ({ before, after }))
}
