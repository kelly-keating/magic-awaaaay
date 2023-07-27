import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getCardsFromSet } from '../api'
import { Card } from '../../models/cards'

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
        <img src={one.image_uris.small} alt={card.name + ' front'} />
        <img src={two.image_uris.small} alt={card.name + ' back'} />
      </>
    )
  }

  const renderCard = (card: Card) => {
    return (
      <Link to={`/cards/${card.id}`}>
        <div style={{ display: 'inline-block', minWidth: '170px' }}>
          <p>{card.name}</p>
          {card.image_uris ? (
            <img src={getImg(card, 'small')} alt={card.name} />
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
        <h1>{setName}!</h1>
        <h2>What a cool set</h2>
      </section>
      <section>{cards.map((card) => renderCard(card))}</section>
      <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
    </>
  )
}

export default Set
