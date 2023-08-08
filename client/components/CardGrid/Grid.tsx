import { Card, CardCounts } from '../../../models/cards'

import { Flex } from '@chakra-ui/react'
import Tile from './Tile'

interface Props {
  cards: Card[]
  cardCounts: CardCounts
  maxNum: number
  updateCount: (cardId: string, normal: number, foil: number) => void
}

function Grid({ cards, cardCounts, maxNum, updateCount }: Props) {
  return (
    <Flex wrap="wrap" justify="center">
      {cards.map((card) => (
        <Tile key={card.id} card={card} count={cardCounts[card.id]} maxNum={maxNum} updateCount={updateCount} />
      ))}
    </Flex>
  )
}

export default Grid
