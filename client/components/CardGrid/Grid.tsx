import { Card } from "../../../models/cards"
import { Flex } from "../utils"

import Tile from "./Tile"

interface Props {
  cards: Card[]
}

function Grid({ cards }: Props) {
  return (
    <Flex wrap='wrap'>
      {cards.map((card) => <Tile key={card.id} card={card} />)}
    </Flex>
  )
}

export default Grid
