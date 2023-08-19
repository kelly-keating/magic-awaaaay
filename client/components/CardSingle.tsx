import { Card, Currencies } from '../../models/cards'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Heading, Image, Stat, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { Link } from './utils'

import { getCardById, getCurrencies } from '../api'

function CardPage() {
  const { id } = useParams()
  const [card, setCard] = useState(null as null | Card)
  const [conversion, setConversion] = useState(null as null | Currencies)

  useEffect(() => {
    getCurrencies()
      .then((currencies) => setConversion(currencies))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (id) {
      getCardById(id)
        .then((card) => setCard(card))
        .catch((err) => alert(err.message))
    }
  }, [id])

  let nzd = null as null | number
  let nzdFoil = null as null | number
  const prices = card?.prices

  if (prices && conversion) {
    const usd = Number(prices.usd)
    const eur = Number(prices.eur)
    const usdFoil = Number(prices.usd_foil)
    const eurFoil = Number(prices.eur_foil)

    const getTotal = (usd: number, eur: number) => {
      if (usd && eur) {
        return ((usd * conversion.usd) + (eur * conversion.eur)) / 2
      } else if (usd) {
       return usd * conversion.usd
      } else if (eur) {
        return eur * conversion.eur
      } else {
        return null
      }
    }

    nzd = getTotal(usd, eur)
    nzdFoil = getTotal(usdFoil, eurFoil)
  }

  // TODO: Add link back to set

  return (
    <>
      <section>
        {card && (
          <>
            {card.card_faces ? (
              <>
                <Image
                  src={card.card_faces[0].image_uris.normal}
                  alt={card.name}
                  fallbackSrc="/card_back.png"
                />
                <Image
                  src={card.card_faces[1].image_uris.normal}
                  alt={card.name}
                  fallbackSrc="/card_back.png"
                />
              </>
            ) : (
              <Image
                src={card.image_uris.normal}
                alt={card.name}
                fallbackSrc="/card_back.png"
              />
            )}
            
            <Heading as="h2">{card.name}</Heading>
            <Heading as="h3"><Link to={`/sets/${card.set_name}`}>{card.set_name}</Link></Heading>

            <StatGroup>
              <Stat>
                <StatLabel>Regular</StatLabel>
                <StatNumber>${nzd ? nzd.toFixed(2) : " - "}</StatNumber>
                <StatHelpText>TCGplayer (US${prices?.usd || " - "}) | Cardmarket (€{prices?.eur || " - "})</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Foil</StatLabel>
                <StatNumber>${nzdFoil ? nzdFoil.toFixed(2) : " - "}</StatNumber>
                <StatHelpText>TCGplayer (US${prices?.usd_foil || " - "}) | Cardmarket (€{prices?.eur_foil || " - "})</StatHelpText>
              </Stat>
            </StatGroup>

            <p>{card.type_line}</p>
            <p>{card.flavor_text}</p>
            <p>{card.collector_number}</p>
            <p>{card.rarity}</p>
            <p>{card.oracle_text}</p>
            <p>{card.mana_cost}</p>
            <p>{card.cmc}</p>
            <p>{card.power}</p>
            <p>{card.toughness}</p>
            <p>{card.loyalty}</p>
            <p>{card.rarity}</p>
          </>
        )}
      </section>

      {
        card ? (
          <Link to={"/sets/" + card?.set_name}>Back to set</Link>
        ) : (
          <Link to="/">Home</Link>
        ) 
      }
    </>
  )
}

export default CardPage
