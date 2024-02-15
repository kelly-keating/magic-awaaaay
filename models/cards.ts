export type Card = OneSidedCard | TwoSidedCard

interface GenericCard {
  id: string
  name: string
  card_faces: [CardFace, CardFace] | null
  cmc: number
  collector_number: number
  full_collector_number: string | null
  color_identity: string[]
  colors: string | null
  edhrec_rank: number
  flavor_text: string | null
  image_uris: ImageUris | null
  layout: string
  loyalty: string | null
  mana_cost: string | null
  oracle_text: string | null
  power: number | null
  prices: Prices
  rarity: string
  scryfall_uri: string
  set: string
  set_name: string
  set_uri: string
  tcgplayer_id: number
  toughness: number | null
  type_line: string
  uri: string
}

export interface OneSidedCard extends GenericCard {
  card_faces: null
  image_uris: ImageUris
}

export interface TwoSidedCard extends GenericCard {
  card_faces: [CardFace, CardFace]
}

interface CardFace {
  object: string
  name: string
  mana_cost: string
  type_line: string
  oracle_text: string
  colors: string[]
  artist: string
  artist_id: string
  illustration_id: string
  image_uris: ImageUris
}

export interface Prices {
  usd: string | null
  usd_foil: string | null
  eur: string | null
  eur_foil: string | null
}

interface ImageUris {
  small: string
  normal: string
  large: string
  png: string
  art_crop: string
  border_crop: string
}

// prices and image_uris are strings in the database
export type DBCard = Omit<
  Card,
  'card_faces' | 'color_identity' | 'prices' | 'image_uris'
> & {
  card_faces: string | null
  color_identity: string
  image_uris: string | null
  prices: string
}

export interface Currencies {
  usd: number
  eur: number
  date: string
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

export interface QueryData {
  unowned: boolean | null
  excludeLand: boolean | null
  rarity: string | null
  colors: string[] | null
  sets: string[] | null
  types: string[] | null
  includeDescription: boolean | null
}

/*

export type Card = OneSidedCard | TwoSidedCard

export interface GenericCard {
  id: string
  name: string
  collector_number: number
  full_collector_number: string
  color_identity: string[]
  edhrec_rank: number
  layout: string
  oracle_text?: string
  prices: Prices
  rarity: string
  scryfall_uri: string
  set: string
  set_name: string
  set_uri: string
  uri: string
}

interface OneSidedCard extends GenericCard {
  cmc: number
  colors: string[]
  flavor_text?: string
  image_uris: ImageUris
  loyalty?: string
  mana_cost: string
  power?: string
  toughness?: number
  type_line: string
}

interface TwoSidedCard extends GenericCard {
  card_faces: [CardFace, CardFace]
}

*/
