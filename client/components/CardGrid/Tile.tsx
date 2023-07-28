import { Card } from '../../../models/cards'

import {
  Divider,
  Heading,
  Image,
  Link,
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
    // TODO: flex this
    return (
      <>
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
      </>
    )
  }

  return (
    <Tile maxW="200px">
      <TileBody>
        {card.image_uris ? (
          <Image
            src={JSON.parse(card.image_uris).small}
            alt={card.name}
            fallbackSrc="/card_back.png"
            style={{ maxHeight: '200px' }}
          />
        ) : (
          renderBothFaces(card)
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
      </TileFooter>
    </Tile>
  )
}

export default CardTile
