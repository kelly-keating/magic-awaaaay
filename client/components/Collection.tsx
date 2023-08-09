import { Card, CardCounts } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Heading } from '@chakra-ui/react'
import { Link } from './utils'
import CardGrid from './CardGrid/Grid'

import { getAllUserCards } from '../api'

function Collection() {
  const { getAccessTokenSilently } = useAuth0()
  const [cards, setCards] = useState([] as Card[])
  const [cardCounts, setCardCounts] = useState(null as null | CardCounts)

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => getAllUserCards(token))
      .then(({ cards, userCards }) => {
        setCards(cards)
        setCardCounts(userCards)
      })
      .catch((err) => alert(err.message))
  }, [getAccessTokenSilently])

  const renderSet = (name: string) => (
    <>
      <Heading as="h3">{name}</Heading>
      <p>Card 1</p>
      <p>Card 2</p>
      <p>Card 3</p>
    </>
  )

  return (
    <>
      <section>
        <Heading as="h2">My Collection</Heading>
        <p>Look at all your pretty cards</p>
      </section>

      <section>
        {renderSet('ixalan')}
        {renderSet('rivals')}
        {renderSet('war of the spark')}
      </section>

      {cardCounts && <CardGrid cards={cards} cardCounts={cardCounts} updateCount={() => {}} />}

      <Link to="/">Home</Link>
    </>
  )
}

export default Collection
