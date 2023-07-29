import * as Models from '../../../models/sets'
import { useEffect, useState } from 'react'

import { Accordion, Button, Heading, Link } from '../utils'
import Block from './Block'
import SetListing from './SetListing'

import { getAllSets } from '../../api'

function Sets() {
  const [all, setAll] = useState([] as Models.Set[])
  const [blocks, setBlocks] = useState({} as Models.Blocks)
  const [showCategories, setShowCategories] = useState(false)

  useEffect(() => {
    getAllSets()
      .then((sets) => {
        setAll(sets)

        const blocks = sets.reduce((obj: Models.Blocks, set: Models.Set) => {
          const name = set.block || 'Expansions'
          obj[name] ? obj[name].push(set) : (obj[name] = [set])
          return obj
        }, {} as Models.Blocks)

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
            {all.map((set) => (
              <SetListing key={set.id} set={set} />
            ))}
          </>
        )}
      </div>

      <Link to="/">Home</Link>
    </>
  )
}

export default Sets
