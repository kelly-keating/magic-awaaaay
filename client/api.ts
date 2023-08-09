import request from 'superagent'
import { Card, CardCounts, Currencies, UserCard } from '../models/cards'
import { NeighbouringSets, Set } from '../models/sets'

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

export function getUsersCardsFromSet(token: string, setName: string): Promise<CardCounts> {
  return request
    .get(`/api/v1/sets/${setName}/cards`)
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

export function getCardById(id: string): Promise<Card> {
  return request.get(`/api/v1/cards/single/${id}`).then((res) => res.body)
}

// "prices":{"usd":null,"usd_foil":"0.25","usd_etched":null,"eur":null,"eur_foil":null,"tix":null}
interface Prices {
  usd: string | null
  usd_foil: string | null
  eur: string | null
  eur_foil: string | null
}
export function getCurrentPrices(id: string): Promise<Prices> {
  return request
    .get(`https://api.scryfall.com/cards/${id}`)
    .then((res) => res.body.prices)
}

export function getCurrencies(): Promise<Currencies> {
  return request.get('/api/v1/currencies').then((res) => res.body)
}
