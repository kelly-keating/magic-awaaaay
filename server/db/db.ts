import { Card } from '../../models/cards'

import db from './connection'

export function getCards(): Promise<Card[]> {
  return db('cards')
}

export function getCardById(id: string): Promise<Card> {
  return db('cards').where('id', id).first()
}

export function getCardsFromSet(set: string): Promise<Card[]> {
  return db('cards').where('set_name', set).orderBy('collector_number')
}

export function getSets(): Promise<string[]> {
  return db('sets').orderBy('released_at')
}
