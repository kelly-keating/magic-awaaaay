import request from 'superagent'
import { Card, CardCounts, UserCard } from '../models/cards'
import { Set } from '../models/sets'

export function getCardById(id: string): Promise<Card> {
  return request.get(`/api/v1/cards/single/${id}`).then((res) => res.body)
}

export function getCardsFromSet(setName: string): Promise<Card[]> {
  return request.get(`/api/v1/cards/set/${setName}`).then((res) => res.body)
}

export function getUsersCardsFromSet(token: string, setName: string): Promise<CardCounts> {
  return request
    .get(`/api/v1/cards/set/${setName}/user`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body.reduce((obj: CardCounts, card: UserCard) => {
      obj[card.card_id] = {
        normal: card.quantity,
        foil: card.foil_quantity,
      }
      return obj
    }, {}))
}

export function addCardToUser(token: string, cardId: string, normal: number, foil: number): Promise<UserCard> {
  return request
    .post('/api/v1/cards/add/user')
    .set('Authorization', `Bearer ${token}`)
    .send({ cardId, normal, foil })
    .then((res) => res.body)
}

export function getAllSets(): Promise<Set[]> {
  return request.get(`/api/v1/sets`).then((res) => res.body)
}
