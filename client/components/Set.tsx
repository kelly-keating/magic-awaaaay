import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../../models/cards'

import { Heading, Image, Link } from './utils'

import { getCardsFromSet } from '../api'

function Set() {
  const { setName } = useParams()
  const [cards, setCards] = useState([] as Card[])

  useEffect(() => {
    if (setName) {
      getCardsFromSet(setName)
        .then((cards) => setCards(cards))
        .catch((err) => alert(err.message))
    }
  }, [setName])

  const getImg = (card: Card, size: string) => {
    return JSON.parse(card.image_uris)[size]
  }

  const renderBothFaces = (card: Card) => {
    const [one, two] = JSON.parse(card.card_faces)
    return (
      <>
        <Image src={one.image_uris.small} alt={card.name + ' front'} fallbackSrc="/card_back.png"/>
        <Image src={two.image_uris.small} alt={card.name + ' back'} fallbackSrc="/card_back.png"/>
      </>
    )
  }

  const renderCard = (card: Card) => {
    return (
      <Link to={`/cards/${card.id}`}>
        <div style={{ display: 'inline-block', minWidth: '170px' }}>
          <p>{card.name}</p>
          {card.image_uris ? (
            <Image src={getImg(card, 'small')} alt={card.name} fallbackSrc="/card_back.png"/>
          ) : (
            renderBothFaces(card)
          )}
        </div>
      </Link>
    )
  }

  return (
    <>
      <section>
        <Heading as="h2">{setName}!</Heading>
        <p>What a cool set</p>
      </section>
      <section>{cards.map((card) => renderCard(card))}</section>
      <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
    </>
  )
}

export default Set
