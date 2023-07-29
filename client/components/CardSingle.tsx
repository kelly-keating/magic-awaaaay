import * as Models from '../../models/cards'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heading, Image, Link } from './utils'

import { getCardById } from '../api'

function Card() {
  const { id } = useParams()
  const [card, setCard] = useState(null as null | Models.Card)

  useEffect(() => {
    if (id) {
      getCardById(id)
        .then((card) => setCard(card))
        .catch((err) => alert(err.message))
    }
  }, [id])

  return (
    <>
      <section>
        {card?.name ? (
          <>
            <Image
              src={JSON.parse(card.image_uris).normal}
              alt={card.name}
              fallbackSrc="/card_back.png"
            />
            <Heading as="h2">{card.name}</Heading>
            <Heading as="h3">{card.set_name}</Heading>
            <p>{card.type_line}</p>
            <p>{card.flavor_text}</p>
          </>
        ) : (
          <img
            src="https://i.giphy.com/media/11FuEnXyGsXFba/giphy.webp"
            alt=""
          />
        )}
      </section>

      <Link to="/">Home</Link>
    </>
  )
}

export default Card
