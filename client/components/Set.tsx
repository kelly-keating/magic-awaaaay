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

  const updateCardCount = (cardId: string, normal: number, foil: number) => {
    setCounts((counts) => {
      const newCounts = { ...counts }
      newCounts[cardId] = { normal, foil }
      return newCounts
    })
  }

  const uniqueOwned = Object.keys(counts).length
  const totalOwned = Object.values(counts).reduce((total, { normal, foil }) => total + normal + foil, 0)

  // TODO: Add link to other sets in block

  return (
    <>
      <section>
        <Heading as="h2">{setName}!</Heading>
        <p>What a cool set</p>

        <p></p>
        <p>Unique cards: {uniqueCards} ({variants.length} variants)</p>
        <p>Unique cards owned: {uniqueOwned} ({totalOwned} total)</p>
        {missingNumbers}
      </section>
      <CardGrid cards={cards} cardCounts={counts} maxNum={maxNum} updateCount={updateCardCount} />
      <Link to="/sets">Sets</Link> | <Link to="/">Home</Link>
    </>
  )
}

export default Set
