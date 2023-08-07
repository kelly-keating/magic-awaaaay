import { Card } from '../../models/cards'

import db from './connection'

export function getCards(): Promise<Card[]> {
  return db('cards')
}

export function getCardById(id: string): Promise<Card> {
  return db('cards').where('id', id).first()
}

export function getCardsFromSet(set: string): Promise<Card[]> {
  return db('cards')
    .where('set_name', set)
    .orderBy(['collector_number', 'full_collector_number'])
}

export function getUsersCardsFromSet(set: string, userId: string): Promise<Card[]> {
  return db('users_cards')
    .select('users_cards.*')
    .join('cards', 'cards.id', 'users_cards.card_id')
    .where('set_name', set)
    .andWhere('users_cards.user_id', userId)
    .orderBy(['collector_number', 'full_collector_number'])
}

export function getSets(): Promise<string[]> {
  return db('sets').orderBy('released_at')
}
