import { Card } from "../../../models/cards"

import Tile from "./Tile"

interface Props {
  cards: Card[]
}

function Grid({ cards }: Props) {
  // TODO: add gaps between tiles
  return (
    <div>
      {cards.map((card) => <Tile key={card.id} card={card} />)}
    </div>
  )
}

export default Grid
