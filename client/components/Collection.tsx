import { Card, CardCounts } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { Heading } from '@chakra-ui/react'
import { Link } from './utils'
import CardGrid from './CardGrid/Grid'

import { getAllUserCards, getCurrencies } from '../api'

function Collection() {
  const { getAccessTokenSilently } = useAuth0()
  const [cards, setCards] = useState([] as Card[])
  const [cardCounts, setCardCounts] = useState(null as null | CardCounts)
  const [totalValue, setTotalValue] = useState(0)

  // TODO: tidy this thing
  useEffect(() => {
    if (cardCounts && cards.length) {
      getCurrencies()
        .then((currencies) => {
          const getAvgNzd = (usd: string | null, eur: string | null) => {
            if (usd && eur) {
              return (
                (Number(usd) * currencies.usd + Number(eur) * currencies.eur) /
                2
              )
            } else if (usd) {
              return Number(usd) * currencies.usd
            } else if (eur) {
              return Number(eur) * currencies.eur
            } else {
              return 0
            }
          }

          return cards.reduce((total, card) => {
            const { usd, usd_foil, eur, eur_foil } = card.prices

            const normalPrice = getAvgNzd(usd, eur)
            const foilPrice = getAvgNzd(usd_foil, eur_foil)

            const { normal, foil } = cardCounts[card.id]

            return normal * normalPrice + foil * foilPrice + total
          }, 0)
        })
        .then((total) => setTotalValue(total))
        .catch((err) => console.log('oopsy', err.message))
    }
  }, [cards, cardCounts])

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => getAllUserCards(token))
      .then(({ cards, userCards }) => {
        setCards(cards)
        setCardCounts(userCards)
      })
      .catch((err) => alert(err.message))
  }, [getAccessTokenSilently])

  return (
    <>
      <section>
        <Heading as="h2">My Collection</Heading>
        <p>Look at all your pretty cards</p>
        <p>Total value: ${totalValue.toFixed(2)}</p>
      </section>

      <CardGrid
        cards={cards}
        cardCounts={cardCounts || {}}
        updateCount={() => {}}
      />

      <Link to="/">Home</Link>
    </>
  )
}

export default Collection
