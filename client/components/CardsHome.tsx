import { Card, CardCounts, QueryData } from '../../models/cards'
import { Set } from '../../models/sets'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import {
  Button,
  Checkbox,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Switch,
  Tag,
} from '@chakra-ui/react'
import CardGrid from './CardGrid/Grid'

import { getSomeCards, getAllUserCards, searchCards, getAllSets } from '../api'

function Cards() {
  const { user, getAccessTokenSilently } = useAuth0()
  const [cards, setCards] = useState([] as Card[])
  const [cardCounts, setCardCounts] = useState(null as null | CardCounts)
  const [sets, setSets] = useState([] as Set[])
  const [showAdvanced, setShowAdvanced] = useState(false)

  const [queryData, setQueryData] = useState({
    unowned: null,
    excludeLand: null,
    rarity: null,
    colors: null,
    sets: null,
    types: null,
  } as QueryData)

  useEffect(() => {
    getSomeCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err.message))

    getAllSets()
      .then((sets) => setSets(sets))
      .catch((err) => console.log(err.message))
  }, [])

  useEffect(() => {
    if (user) {
      getAccessTokenSilently()
        .then((token) => getAllUserCards(token))
        .then(({ userCards }) => {
          setCardCounts(userCards)
        })
        .catch((err) => console.log(err.message))
    }
  }, [user, getAccessTokenSilently])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search') as string
    getAccessTokenSilently()
      .then((token) => searchCards(token, search, queryData))
      .catch(() => searchCards(null, search, queryData))
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err.message))
  }

  const updateCardCount = (cardId: string, normal: number, foil: number) => {
    setCardCounts((counts) => {
      const newCounts = { ...counts }
      newCounts[cardId] = { normal, foil }
      return newCounts
    })
  }

  const handleOwnership = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setQueryData((data) => ({ ...data, unowned: checked ? true : null }))
  }

  const handleExcludeLand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setQueryData((data) => ({ ...data, excludeLand: checked ? true : null }))
  }

  // TODO: clear rarity somehow - x on tags?
  const handleRarity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setQueryData((data) => ({ ...data, rarity: value }))
  }

  const handleColors = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setQueryData((data) => {
      if (checked) {
        if (data.colors) {
          return { ...data, colors: [...data.colors, value] }
        } else {
          return { ...data, colors: [value] }
        }
      } else {
        if (data.colors) {
          const newColors = data.colors.filter((color) => color !== value)
          if (newColors.length) {
            return { ...data, colors: newColors }
          } else {
            return { ...data, colors: null }
          }
        } else {
          return data
        }
      }
    })
  }

  let selectedSet = null as null | string
  const handleSetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    selectedSet = value
  }

  const handleSetAdd = () => {
    const setArr = queryData.sets ? [...queryData.sets] : []
    if (selectedSet && !setArr.includes(selectedSet)) {
      setArr.push(selectedSet)
      setQueryData((data) => ({ ...data, sets: setArr }))
    }
  }

  let selectedType = null as null | string
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    selectedType = value
  }

  const handleTypeAdd = () => {
    const typeArr = queryData.types ? [...queryData.types] : []
    if (selectedType && !typeArr.includes(selectedType)) {
      typeArr.push(selectedType)
      setQueryData((data) => ({ ...data, types: typeArr }))
    }
  }

  return (
    <>
      <section>
        <Heading as="h2">Cards</Heading>
        <p>Search a card</p>
      </section>

      <Stack direction="row" spacing={4}>
        {queryData.unowned && <Tag>unowned only</Tag>}
        {queryData.excludeLand && <Tag>no land</Tag>}
        {queryData.rarity && <Tag>{queryData.rarity}</Tag>}
        {queryData.colors &&
          queryData.colors.map((color) => (
            <Tag key={color} colorScheme={color}>
              {color}
            </Tag>
          ))}
        {queryData.types &&
          queryData.types.map((type) => <Tag key={type}>{type}</Tag>)}
        {queryData.sets &&
          queryData.sets.map((set) => <Tag key={set}>Set: {set}</Tag>)}
      </Stack>

      {/* TODO: decide what to do about multiple search terms later */}
      <form onSubmit={handleSearch}>
        <InputGroup size="md">
          <FormLabel>Search</FormLabel>
          <Input name="search" placeholder="Search" pr="4.5rem" />
          <InputRightElement width="4.5rem">
            <Button type="submit" h="1.75rem" size="sm">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>

      <Button onClick={() => setShowAdvanced(!showAdvanced)}>
        {showAdvanced ? 'Hide' : 'Show'} Advanced Search
      </Button>

      <div hidden={!showAdvanced}>
        <label htmlFor="unowned">Only show cards not yet owned</label>
        <Switch id="unowned" onChange={handleOwnership} />

        <label htmlFor="exclude-land">Exclude land cards</label>
        <Switch id="exclude-land" onChange={handleExcludeLand} />

        <Select placeholder="Rarity" onChange={handleRarity}>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </Select>

        <p>Colours:</p>
        <Stack spacing={5} direction="row">
          <Checkbox value="black" onChange={handleColors}>
            Black
          </Checkbox>
          <Checkbox value="blue" onChange={handleColors}>
            Blue
          </Checkbox>
          <Checkbox value="green" onChange={handleColors}>
            Green
          </Checkbox>
          <Checkbox value="red" onChange={handleColors}>
            Red
          </Checkbox>
          <Checkbox value="white" onChange={handleColors}>
            White
          </Checkbox>
          <Checkbox value="colorless" onChange={handleColors}>
            Colorless
          </Checkbox>
        </Stack>

        <Select placeholder="Type" onChange={handleTypeChange}>
          <option value="creature">Creature</option>
          <option value="planeswalker">Planeswalker</option>
          <option value="instant">Instant</option>
          <option value="sorcery">Sorcery</option>
          <option value="artifact">Artifact</option>
          <option value="enchantment">Enchantment</option>
          <option value="land">Land</option>
        </Select>
        <Button onClick={handleTypeAdd}>Add type</Button>

        <Select placeholder="Set" onChange={handleSetChange}>
          {sets.map((set) => (
            <option key={set.code} value={set.code}>
              {set.name}
            </option>
          ))}
        </Select>
        <Button onClick={handleSetAdd}>Add set</Button>
      </div>

      <CardGrid
        cards={cards}
        cardCounts={cardCounts || {}}
        updateCount={updateCardCount}
      />
    </>
  )
}

export default Cards
