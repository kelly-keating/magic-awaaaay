import {
  Card,
  CardCounts,
  DBCard,
  UserCard,
} from '../../models/cards'

export function prepCardForDb(card: Card): DBCard {
  const { card_faces, color_identity, image_uris, prices, ...rest } = card

  return {
    ...rest,
    card_faces: JSON.stringify(card_faces),
    color_identity: JSON.stringify(color_identity),
    image_uris: JSON.stringify(image_uris),
    prices: JSON.stringify(prices),
  }
}

export function prepCardForClient(card: DBCard): Card {
  const { card_faces, color_identity, image_uris, prices, ...rest } = card
  return {
    ...rest,
    card_faces: JSON.parse(card_faces),
    color_identity: JSON.parse(color_identity),
    image_uris: JSON.parse(image_uris),
    prices: JSON.parse(prices),
  }
}

export function condenseUserCards(userCards: UserCard[]): CardCounts {
  return userCards.reduce((obj: CardCounts, card: UserCard) => {
    obj[card.card_id] = {
      normal: card.quantity,
      foil: card.foil_quantity,
    }
    return obj
  }, {})
}