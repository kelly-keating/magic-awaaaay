import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import * as Models from '../../models/cards'
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
            <img src={JSON.parse(card.image_uris).normal} alt={card.name} />
            <h3>{card.name}</h3>
            <h6>{card.set_name}</h6>
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
