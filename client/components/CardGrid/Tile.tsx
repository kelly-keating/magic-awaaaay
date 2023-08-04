import { Card } from '../../../models/cards'

import {
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
} from '@chakra-ui/react'
import { CheckCircleIcon, Link, Tile, TileBody, TileFooter } from '../utils'

interface Props {
  card: Card
  maxNum: number
}

function CardTile({ card, maxNum }: Props) {
  const renderBothFaces = (card: Card) => {
    const [one, two] = JSON.parse(card.card_faces)
    return (
      <Flex justify="space-around">
        <Image
          src={one.image_uris.small}
          alt={card.name + ' front'}
          fallbackSrc="/card_back.png"
          style={{ width: 'calc(200px - (2 * var(--card-padding)))' }}
        />
        <Image
          src={two.image_uris.small}
          alt={card.name + ' back'}
          fallbackSrc="/card_back.png"
          style={{ width: 'calc(200px - (2 * var(--card-padding)))' }}
        />
      </Flex>
    )
  }

  const twoFaced = Boolean(!card.image_uris)
  // let bgCol = ""
  // if (twoFaced) {
  //   bgCol = "#e0e0f0"
  // } else if (card.full_collector_number) {
  //   bgCol = "beige"
  // }

  return (
    <Tile
      width={twoFaced ? 'calc(400px + var(--chakra-space-2))' : '200px'}
      margin="1"
      // backgroundColor={bgCol}
      textAlign="center"
    >
      <Link to={`/cards/${card.id}`} key={card.id}>
        <TileBody>
          {twoFaced ? (
            renderBothFaces(card)
          ) : (
            <Image
              src={JSON.parse(card.image_uris).small}
              alt={card.name}
              fallbackSrc="/card_back.png"
              style={{ width: 'calc(200px - (2 * var(--card-padding)))' }}
            />
          )}
          <Heading as="h3" size="sml">
            {card.name}
          </Heading>
        </TileBody>
      </Link>
      <Divider />
      <TileFooter>
        <CheckCircleIcon />
        <Spacer />
        <p>
          {card.full_collector_number || card.collector_number} / {maxNum}
        </p>
      </TileFooter>
    </Tile>
  )
}

export default CardTile
