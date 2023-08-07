import { Card, CardCount } from '../../../models/cards'

import { Flex, Heading, Image, Spacer } from '@chakra-ui/react'
import {
  CheckCircleIcon,
  Link,
  StarIcon,
  Tile,
  TileBody,
  TileFooter,
} from '../utils'

interface Props {
  card: Card
  count: CardCount | undefined
  maxNum: number
}

function CardTile({ card, count, maxNum }: Props) {
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

  let bgCol = ''
  if (card.full_collector_number) {
    bgCol = 'beige'
  } else {
    bgCol = ''
  }

  return (
    <Tile
      width={twoFaced ? 'calc(400px + var(--chakra-space-2))' : '200px'}
      margin="1"
      backgroundColor={bgCol}
      textAlign="center"
      justifyContent="space-between"
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
          <Heading
            as="h3"
            size="sml"
            style={{ marginTop: 'var(--card-padding)' }}
          >
            {card.name}
          </Heading>
        </TileBody>
      </Link>
      <TileFooter>
        <p>
          {card.full_collector_number || card.collector_number} / {maxNum}
        </p>
        <Spacer />
        <div>
          <StarIcon color={count?.foil ? 'orange' : 'darkgray'} />
          <CheckCircleIcon color={count?.normal ? 'forestgreen' : 'darkgray'} />
        </div>
      </TileFooter>
    </Tile>
  )
}

export default CardTile
