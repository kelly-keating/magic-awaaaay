import { Card, CardCounts } from '../../models/cards'
import { Neighbours, Set } from '../../models/sets'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ArrowLeft, ArrowRight, ChevronDown, Link } from './utils'
import CardGrid from './CardGrid/Grid'
import SetListing from './Sets/SetListing'

import { getSetInformation, getUsersCardsFromSet } from '../api'

function SetPage() {
  const { getAccessTokenSilently, user } = useAuth0()
  const { setName } = useParams()
  const goTo = useNavigate()

  const [fullSet, setFullSet] = useState(null as null | Set)
  const [cards, setCards] = useState([] as Card[])
  const [counts, setCounts] = useState({} as CardCounts)
  const [blockSets, setBlockSets] = useState([] as Set[])
  const [neighbours, setNeighbours] = useState(null as null | Neighbours)

  const variants = cards.filter((card) => card.full_collector_number)
  const uniqueCards = cards.length - variants.length

  const maxNum = cards.length ? cards[cards.length - 1].collector_number : 0
  
  // ------
  // TODO: remove if problem solved, otherwise use hook
  const missingNumbers = [] as number[]
  for (let i = 1; i <= maxNum; i++) {
    if (!cards.find((card) => card.collector_number === i)) {
      missingNumbers.push(i)
    }
  }
  if (missingNumbers.length) alert('Missing numbers: ' + missingNumbers)
  // ------

  useEffect(() => {
    const resetData = () => {
      setFullSet(null)
      setCards([])
      setCounts({})
      setBlockSets([])
      setNeighbours(null)
    }
    if (setName) {
      getSetInformation(setName)
        .then(({ set, cards, blockSets, neighbours }) => {
          setFullSet(set)
          setCards(cards)
          setBlockSets(blockSets)
          setNeighbours(neighbours)
        })
        .catch((err) => {
          alert(err.message)
          resetData()
        })
    } else {
      resetData()
    }
  }, [setName])

  useEffect(() => {
    if (setName && user) {
      getAccessTokenSilently()
        .then((token) => getUsersCardsFromSet(token, setName))
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
  const totalOwned = Object.values(counts).reduce(
    (total, { normal, foil }) => total + normal + foil,
    0,
  )

  if (!fullSet) {
    // TODO: actually make an error
    return (
      <p>oops no set</p>
    )
  }

  return (
    <>
      <section>
        <Heading as="h2">{setName}!</Heading>
        <p>What a cool set</p>

        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />}>
            {fullSet.block} Block
          </MenuButton>
          <MenuList>
            {blockSets.map((set) => (
              <MenuItem key={set.name}>
                {/* TODO: make whole menu item clickable */}
                <Link to={`/sets/${set.name}`}>{set.name}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <p>
          Unique cards: {uniqueCards} ({variants.length} variants)
        </p>
        <p>
          Unique cards owned: {uniqueOwned} ({totalOwned} total)
        </p>
      </section>
      <CardGrid
        cards={cards}
        cardCounts={counts}
        maxNum={maxNum}
        updateCount={updateCardCount}
      />
      <div>
        <Flex>
          <SetListing set={neighbours?.before.far || null} />
          <SetListing set={neighbours?.before.near || null} />
          <SetListing set={fullSet} />
          <SetListing set={neighbours?.after.near || null} />
          <SetListing set={neighbours?.after.far || null} />
        </Flex>
        <Button onClick={() => goTo('/sets/' + (neighbours?.before.near?.name || ""))}>
          <ArrowLeft />
        </Button>
        <Link to="/sets">See all sets</Link>
        <Button onClick={() => goTo('/sets/' + (neighbours?.after.near?.name || ""))}>
          <ArrowRight />
        </Button>
      </div>
    </>
  )
}

export default SetPage
