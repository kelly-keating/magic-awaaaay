import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../../models/cards'

import { Heading, Link } from './utils'

import { getCardsFromSet } from '../api'
import CardGrid from './CardGrid/Grid'

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

  return (
    <>
      <section>
        <Heading as="h2">{setName}!</Heading>
        <p>What a cool set</p>
      </section>
      <CardGrid cards={cards} />
      <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
    </>
  )
}

export default Set
