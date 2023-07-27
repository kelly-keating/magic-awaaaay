import request from 'superagent'
import { Card } from '../models/cards'
import { Set } from '../models/sets'

export function getCardById(id: string): Promise<Card> {
  return request.get(`/api/v1/cards/single/${id}`).then((res) => res.body)
}

export function getCardsFromSet(setName: string): Promise<Card[]> {
  return request.get(`/api/v1/cards/set/${setName}`).then((res) => res.body)
}

export function getAllSets(): Promise<Set[]> {
  return request.get(`/api/v1/sets`).then((res) => res.body)
}
