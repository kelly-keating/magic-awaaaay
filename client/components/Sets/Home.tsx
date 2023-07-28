import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Accordion } from '@chakra-ui/accordion'
import { Heading } from '@chakra-ui/layout'
import * as Models from '../../../models/sets'

import Block from './Block'
import SetListing from './SetListing'

import { getAllSets } from '../../api'
import { Button } from '@chakra-ui/button'

type BlocksObj = Record<string, Models.Set[]>

function Sets() {
  const [all, setAll] = useState([] as Models.Set[])
  const [blocks, setBlocks] = useState({} as BlocksObj)
  const [showCategories, setShowCategories] = useState(false)

  useEffect(() => {
    getAllSets()
      .then((sets) => {
        setAll(sets)

        const blocks = sets.reduce((obj: BlocksObj, set: Models.Set) => {
          const name = set.block || 'Expansions'
          obj[name] ? obj[name].push(set) : (obj[name] = [set])
          return obj
        }, {} as BlocksObj)

        setBlocks(blocks)
      })
      .catch((err) => alert(err.message))
  }, [])

  return (
    <>
      <div>
        <Heading as="h2">Sets</Heading>
        <p>View cards under each set</p>
        <Button onClick={() => setShowCategories(!showCategories)}>
          {showCategories ? 'Show all' : 'Show categories'}
        </Button>
      </div>

      <div>
        {!all.length && <p>loading</p>}

        {showCategories ? (
          <Accordion allowToggle>
            {Object.entries(blocks).map((block) => (
              <Block key={block[0]} block={block} />
            ))}
          </Accordion>
        ) : (
          <>
            {all.map((set) => <SetListing key={set.id} set={set} />)}
          </>
        )}
      </div>

      <Link to="/">Home</Link>
    </>
  )
}

export default Sets
