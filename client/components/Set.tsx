import { Card } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heading, Link } from './utils'
import CardGrid from './CardGrid/Grid'

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

  // TODO: Add link to other sets in block

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
