import request from 'superagent'
import {
  Card,
  CardCounts,
  Currencies,
  QueryData,
  UserCard,
} from '../models/cards'
import { NeighbouringSets, Set } from '../models/sets'

// SETS

export function getAllSets(): Promise<Set[]> {
  return request.get(`/api/v1/sets`).then((res) => res.body)
}

interface SetInformation {
  set: Set
  cards: Card[]
  blockSets: Set[]
  neighbours: NeighbouringSets
}
export function getSetInformation(setName: string): Promise<SetInformation> {
  return request.get(`/api/v1/sets/${setName}`).then((res) => res.body)
}

// CARDS

export function getSomeCards(): Promise<Card[]> {
  return request.get(`/api/v1/cards`).then((res) => res.body)
}

export function getCardById(id: string): Promise<Card> {
  return request.get(`/api/v1/cards/single/${id}`).then((res) => res.body)
}

export function getUsersCardsFromSet(
  token: string,
  setName: string,
): Promise<CardCounts> {
  return request
    .get(`/api/v1/sets/${setName}/user-cards`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}

interface AllCardInfo {
  cards: Card[]
  userCards: CardCounts
}
export function getAllUserCards(token: string): Promise<AllCardInfo> {
  return request
    .get('/api/v1/cards/user')
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}

export function addCardToUser(
  token: string,
  cardId: string,
  normal: number,
  foil: number,
): Promise<UserCard> {
  return request
    .post('/api/v1/cards/user')
    .set('Authorization', `Bearer ${token}`)
    .send({ cardId, normal, foil })
    .then((res) => res.body)
}

export function searchCards(
  token: string | null,
  query: string,
  conditions: QueryData,
): Promise<Card[]> {
  const qs = []

  if (query === '') query = 'allCards'
  if (conditions.sets) qs.push(`sets=${conditions.sets.join(',')}`)
  if (conditions.colors) qs.push(`colors=${conditions.colors.join(',')}`)
  if (conditions.types) qs.push(`types=${conditions.types.join(',')}`)
  if (conditions.rarity) qs.push(`rarity=${conditions.rarity}`)
  if (conditions.unowned) qs.push(`unowned=${conditions.unowned}`)
  if (conditions.excludeLand) qs.push(`excludeLand=${conditions.excludeLand}`)
  if (qs.length) query += `?${qs.join('&')}`

  if (token) {
    return request
      .get(`/api/v1/cards/search/${query}/loggedIn`)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => res.body)
  } else {
    return request.get(`/api/v1/cards/search/${query}`).then((res) => res.body)
  }
}

// PRICES

export function getCurrencies(): Promise<Currencies> {
  return request.get('/api/v1/currencies').then((res) => res.body)
}
