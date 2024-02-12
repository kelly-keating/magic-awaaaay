export interface Set {
  id: string
  code: string
  name: string
  block: string | null
  block_code: string | null
  card_count: number
  icon_svg_uri: string
  released_at: string
  set_type: string
  uri: string
  parent_set_code: string | null
}

export type Blocks = Record<string, Set[]>
export interface Neighbours {
  before: OneSideNeighbours
  after: OneSideNeighbours
}
export interface OneSideNeighbours {
  near: Set | null
  far: Set | null
}
