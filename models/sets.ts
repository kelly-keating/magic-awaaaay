export interface Set {
  id: string
  code: string
  name: string
  block: string
  block_code: string
  card_count: number
  icon_svg_uri: string
  released_at: string
  set_type: string
  uri: string
}

export type Blocks = Record<string, Set[]>
export interface NeighbouringSets {
  before: Set[]
  after: Set[]
}
