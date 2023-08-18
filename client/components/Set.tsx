import { Card, CardCounts } from '../../models/cards'
import { NeighbouringSets, Set } from '../../models/sets'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight, ChevronDown, Link } from './utils'
import CardGrid from './CardGrid/Grid'

import { getSetInformation, getUsersCardsFromSet } from '../api'
import SetListing from './Sets/SetListing'

function SetPage() {
  const { getAccessTokenSilently, user } = useAuth0()
  const { setName } = useParams()
  const goTo = useNavigate()

  const [fullSet, setFullSet] = useState(null as null | Set)
  const [cards, setCards] = useState([] as Card[])
  const [counts, setCounts] = useState({} as CardCounts)
  const [blockSets, setBlockSets] = useState([] as Set[])
  const [neighbours, setNeighbours] = useState(null as null | NeighbouringSets)

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
      getSetInformation(setName)
        .then(({ set, cards, blockSets, neighbours }) => {
          setFullSet(set)
          setCards(cards)
          setBlockSets(blockSets)
          setNeighbours(neighbours)
        })
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

        {fullSet && <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDown />}>{fullSet.block} Block</MenuButton>
          <MenuList>
            {blockSets.map((set) => (
              <MenuItem key={set.name}>
                {/* TODO: make whole menu item clickable */}
                <Link to={`/sets/${set.name}`}>{set.name}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>}

        <p>Unique cards: {uniqueCards} ({variants.length} variants)</p>
        <p>Unique cards owned: {uniqueOwned} ({totalOwned} total)</p>
        {missingNumbers}
      </section>
      <CardGrid cards={cards} cardCounts={counts} maxNum={maxNum} updateCount={updateCardCount} />
      <div>
      {neighbours && (
        <Flex>
          {neighbours.before.map(set => <SetListing key={set.name} set={set} />)}
          {fullSet && <SetListing key={fullSet.name} set={fullSet} />}
          {neighbours.after.map(set => <SetListing key={set.name} set={set} />)}
        </Flex>
      )}
      <Button onClick={() => goTo('/sets/' + neighbours?.before[1].name)}>
        <ArrowLeft />
      </Button>
      <Link to="/sets">See all sets</Link>
      <Button onClick={() => goTo('/sets/' + neighbours?.after[1].name)}>
        <ArrowRight />
      </Button>
      </div>
    </>
  )
}

export default SetPage
