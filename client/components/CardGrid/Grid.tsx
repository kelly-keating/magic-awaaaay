import { Card, CardCounts } from '../../../models/cards'

import { Flex } from '@chakra-ui/react'
import Tile from './Tile'

interface Props {
  cards: Card[]
  cardCounts: CardCounts
  maxNum: number
}

function Grid({ cards, cardCounts, maxNum }: Props) {
  return (
    <Flex wrap="wrap" justify="center">
      {cards.map((card) => (
        <Tile key={card.id} card={card} count={cardCounts[card.id]} maxNum={maxNum} />
      ))}
    </Flex>
  )
}

export default Grid
