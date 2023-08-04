import { Card } from '../../../models/cards'

import { Flex } from '@chakra-ui/react'
import Tile from './Tile'

interface Props {
  cards: Card[]
  maxNum: number
}

function Grid({ cards, maxNum }: Props) {
  return (
    <Flex wrap="wrap" justify="center">
      {cards.map((card) => (
        <Tile key={card.id} card={card} maxNum={maxNum} />
      ))}
    </Flex>
  )
}

export default Grid
