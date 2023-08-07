import { Card, CardCounts } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Heading } from '@chakra-ui/react'
import { Link } from './utils'
import CardGrid from './CardGrid/Grid'

import { getCardsFromSet, getUsersCardsFromSet } from '../api'

function Set() {
  const { getAccessTokenSilently, user } = useAuth0()
  const { setName } = useParams()
  const [cards, setCards] = useState([] as Card[])
  const [counts, setCounts] = useState({} as CardCounts)

  const variants = cards.filter((card) => card.full_collector_number)
  const uniqueCards = cards.length - variants.length

  const maxNum = cards.length ? cards[cards.length - 1].collector_number : 0
  const missingNumbers = [] as number[]

  for (let i = 1; i <= maxNum; i++) {
    if (!cards.find((card) => card.collector_number === i)) {
      missingNumbers.push(i)
    }
  }

  useEffect(() => {
    if (setName) {
      getCardsFromSet(setName)
        .then((cards) => setCards(cards))
        .catch((err) => alert(err.message))
    }
  }, [setName])

  // TODO: fix the auth0 stuff - reinitialize, rollback version, etc etc
  // TODO: check error fixed with route
  useEffect(() => {
    if (setName && user) {
      getAccessTokenSilently()
      // getAccessTokenSilently({ authorizationParams: { audience: 'https://magic-awaaaay/api/'}})
      // .then((token) => console.log({token}, 'payload:', (token as unknown as string).split(".")[1]))
        .then(token => getUsersCardsFromSet(token, setName))
        .then((cardCounts) => setCounts(cardCounts))
        .catch((err) => alert(err.message))
    }
  }, [getAccessTokenSilently, setName, user])

  // TODO: Add link to other sets in block

  return (
    <>
      <section>
        <Heading as="h2">{setName}!</Heading>
        <p>What a cool set</p>

        <p>Unique cards: {uniqueCards}</p>
        <p>Total cards: {cards.length}</p>
        <p>Variants: {variants.length}</p>
        {missingNumbers}
      </section>
      <CardGrid cards={cards} cardCounts={counts} maxNum={maxNum} />
      <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
    </>
  )
}

export default Set
