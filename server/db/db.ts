import { Card, Currencies, DBCard, UserCard } from '../../models/cards'
import { NeighbouringSets, Set } from '../../models/sets'

import db from './connection'

// CURRENT PRICES

export function getCurrencies(): Promise<Currencies> {
  return db('currencies').first()
    .then(({ usd, eur, date }) => ({
      usd: Number(usd),
      eur: Number(eur),
      date,
    }))
}

export function updateCurrencies(currencies: Currencies): Promise<void> {
  const { usd, eur, date } = currencies
  return db('currencies')
    .update({
      usd: String(usd),
      eur: String(eur),
      date,
    })
}

// CARDS

export function getCards(): Promise<Card[]> {
  return db('cards')
    .then((cards) => cards.map(prepCardForClient))
}

export function getCardById(id: string): Promise<Card> {
  return db('cards').where('id', id).first()
    .then(prepCardForClient)
}

export function getCardsFromSet(set: string): Promise<Card[]> {
  return db('cards')
    .where('set_name', set)
    .orderBy(['collector_number', 'full_collector_number'])
    .then((cards) => cards.map(prepCardForClient))
}

// USERS_CARDS

export function getUsersCardsFromSet(set: string, userId: string): Promise<UserCard[]> {
  return db('users_cards')
    .select('users_cards.*')
    .join('cards', 'cards.id', 'users_cards.card_id')
    .where('set_name', set)
    .andWhere('users_cards.user_id', userId)
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

export function checkUserCardExists(cardId: string, userId: string): Promise<boolean> {
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

export function getSetByName(name: string): Promise<Set> {
  return db('sets').where('name', name).first()
}

function getTwoNeighbours(released_at: string, direction: 'before' | 'after'): Promise<Set[]> {
  return db('sets')
    .where('released_at', direction === 'before' ? '<' : '>', released_at)
    .orderBy('released_at', direction === 'before' ? 'desc' : 'asc')
    .limit(2)
    .then((result) => direction === 'before' ? result.reverse() : result)
}

export function getSetsFromBlock(blockName: string): Promise<Set[]> {
  return db('sets').where('block', blockName).orderBy('released_at')
}

export function getNeighbouringSets(releasedAt: string): Promise<NeighbouringSets> {
  return Promise.all([
      getTwoNeighbours(releasedAt, 'before'),
      getTwoNeighbours(releasedAt, 'after'),
    ])
    .then(([before, after]) => ({ before, after }))
}

// ----- UTILS ------ //

function prepCardForDb(card: Card): DBCard {
  const { prices, ...rest } = card
  return {
    ...rest,
    prices: JSON.stringify(prices),
  }
}

function prepCardForClient(card: DBCard): Card {
  const { prices, ...rest } = card
  return {
    ...rest,
    prices: JSON.parse(prices),
  }
}
