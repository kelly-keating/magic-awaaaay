import { Card } from '../../../models/cards'

import {
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Tile,
  TileBody,
  TileFooter,
} from '../utils'

interface Props {
  card: Card
}

function CardTile({ card }: Props) {
  const renderBothFaces = (card: Card) => {
    const [one, two] = JSON.parse(card.card_faces)
    return (
      <Flex justify="space-around">
        <Image
          src={one.image_uris.small}
          alt={card.name + ' front'}
          fallbackSrc="/card_back.png"
        />
        <Image
          src={two.image_uris.small}
          alt={card.name + ' back'}
          fallbackSrc="/card_back.png"
        />
      </Flex>
    )
  }

  const twoFaced = Boolean(!card.image_uris)

  return (
    <Tile
      width={twoFaced ? 'calc(400px + var(--chakra-space-2))' : '200px'}
      margin="1"
    >
      <TileBody>
        {twoFaced ? (
          renderBothFaces(card)
        ) : (
          <Image
            src={JSON.parse(card.image_uris).small}
            alt={card.name}
            fallbackSrc="/card_back.png"
            style={{ maxHeight: '200px' }}
          />
        )}
        <Heading as="h3" size="sml">
          {card.name}
        </Heading>
      </TileBody>
      <Divider />
      <TileFooter>
        <Link to={`/cards/${card.id}`} key={card.id}>
          more info
        </Link>
        <Spacer />
        <p>{card.collector_number}</p>
      </TileFooter>
    </Tile>
  )
}

export default CardTile
