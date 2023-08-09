import { Card, CardCounts } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Heading } from '@chakra-ui/react'
import CardGrid from './CardGrid/Grid'

import { getSomeCards, getAllUserCards } from '../api'

function Cards() {
  const { user, getAccessTokenSilently } = useAuth0()
  const [cards, setCards] = useState([] as Card[])
  const [cardCounts, setCardCounts] = useState(null as null | CardCounts)

  useEffect(() => {
    getSomeCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {
    if(user) {
      getAccessTokenSilently()
        .then((token) => getAllUserCards(token))
        .then(({ userCards }) => {
          setCardCounts(userCards)
        })
        .catch((err) => console.log(err.message))
    }
  }, [user, getAccessTokenSilently])

  return (
    <>
      <section>
        <Heading as="h2">Cards</Heading>
        <p>Search a card</p>
      </section>

      <section>filters filters filters</section>

      {cardCounts && <CardGrid cards={cards} cardCounts={cardCounts} updateCount={() => {}} />}
    </>
  )
}

export default Cards
