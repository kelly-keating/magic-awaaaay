import { Card, CardCount, TwoSidedCard } from '../../../models/cards'
import { useAuth0 } from '@auth0/auth0-react'

import { Flex, Heading, Image } from '@chakra-ui/react'
import { Link, Tile, TileBody, TileFooter } from '../utils'
import QuantityButton from './QuantityButton'

import { addCardToUser } from '../../api'

interface Props {
  card: Card
  count: CardCount | undefined
  maxNum?: number
  updateCount: (cardId: string, normal: number, foil: number) => void
}

function CardTile({ card, count, maxNum, updateCount }: Props) {
  const { getAccessTokenSilently, user } = useAuth0()

  const renderBothFaces = (card: TwoSidedCard) => {
    const [one, two] = card.card_faces
    return (
      <Flex justify="space-around">
        <Image
          src={one.image_uris.border_crop}
          alt={card.name + ' front'}
          fallbackSrc="/card_back.png"
          style={{ width: 'calc(200px - (2 * var(--card-padding)))' }}
        />
        <Image
          src={two.image_uris.border_crop}
          alt={card.name + ' back'}
          fallbackSrc="/card_back.png"
          style={{ width: 'calc(200px - (2 * var(--card-padding)))' }}
        />
      </Flex>
    )
  }

  const twoFaced = (card: Card): card is TwoSidedCard => Boolean(card.card_faces)

  let bgCol = ''
  if (count && card.full_collector_number) {
    bgCol = 'beige'
  } else if (count) {
    bgCol = ''
  } else {
    bgCol = 'lightgray'
  }

  const addOne = (addToFoil: boolean) => {
    let { foil, normal } = count || { foil: 0, normal: 0 }
    addToFoil ? foil++ : normal++

    if(!user) return alert('hey sign in bro')

    getAccessTokenSilently()
      .then((token) => addCardToUser(token, card.id, normal, foil))
      .then(() => updateCount(card.id, normal, foil))
      .catch((err) => console.log(err))
  }

  return (
    <Tile
      width={twoFaced(card) ? 'calc(400px + var(--chakra-space-2))' : '200px'}
      margin="1"
      backgroundColor={bgCol}
      textAlign="center"
      justifyContent="space-between"
      size="sm"
    >
      <Link to={`/cards/${card.id}`} key={card.id}>
        <TileBody paddingTop={0}>
          {twoFaced(card) ? (
            renderBothFaces(card)
          ) : (
            <Image
              src={card.image_uris.border_crop}
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

      <TileFooter
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        paddingTop={0}
      >
        <QuantityButton count={count?.normal} addOne={addOne} />
        {maxNum && <p>
          {card.full_collector_number || card.collector_number} / {maxNum}
        </p>}
        <QuantityButton count={count?.foil} foil={true} addOne={addOne} />
      </TileFooter>
    </Tile>
  )
}

export default CardTile
