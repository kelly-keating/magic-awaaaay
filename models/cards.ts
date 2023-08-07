export interface Card {
  id: string
  name: string
  card_faces: string
  cmc: number
  collector_number: number
  full_collector_number: string
  color_identity: string
  colors: string
  edhrec_rank: number
  flavor_text: string
  image_uris: string
  layout: string
  loyalty: string
  mana_cost: string
  oracle_text: string
  power: number
  rarity: string
  scryfall_uri: string
  set: string
  set_name: string
  set_uri: string
  tcgplayer_id: number
  toughness: number
  type_line: string
  uri: string
}

export interface UserCard {
  id: string
  user_id: string
  card_id: string
  quantity: number
  foil_quantity: number
}

export interface CardCount {
  normal: number
  foil: number
}
export type CardCounts = Record<string, CardCount>
