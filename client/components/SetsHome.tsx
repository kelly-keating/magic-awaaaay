import { Link } from 'react-router-dom'
import * as Models from '../../models/sets'
import Block from './SetBlock'
import { getAllSets } from '../api'
import { useEffect, useState } from 'react'

type BlocksObj = Record<string, Models.Set[]>

function Sets() {
  const [all, setAll] = useState([] as Models.Set[])
  const [core, setCore] = useState([] as Models.Set[])
  const [blocks, setBlocks] = useState({} as BlocksObj)
  const [showCategories, setShowCategories] = useState(false)

  useEffect(() => {
    getAllSets()
      .then((sets) => {
        setAll(sets)

        const blocks = sets.reduce((obj: BlocksObj, set: Models.Set) => {
          const name = set.block || 'core'
          obj[name] ? obj[name].push(set) : (obj[name] = [set])
          return obj
        }, {} as BlocksObj)

        const core = blocks.core
        delete blocks.core

        if (core) setCore(core)
        setBlocks(blocks)
      })
      .catch((err) => alert(err.message))
  }, [])

  // const renderBlock = (block: [string, Models.Set[]]) => {
  //   const [name, sets] = block
  //   return (
  //     <>
  //       <h4>{name}</h4>
  //       {sets.map((set) => (
  //         <p>
  //           <Link to={set.name}>{set.name}</Link>
  //         </p>
  //       ))}
  //     </>
  //   )
  // }

  return (
    <>
      <section>
        <h2>Sets</h2>
        <p>View cards under each set</p>
      </section>

      <section>
        {!all.length && <p>loading</p>}

        <button onClick={() => setShowCategories(!showCategories)}>
          {showCategories ? 'Show all' : 'Show categories'}
        </button>

        {showCategories ? (
          <>
            <Block block={['Core', core]} />
            {Object.entries(blocks).map((block) => (
              <Block key={block[0]} block={block} />
            ))}
          </>
        ) : (
          <>
            {all.map((set) => (
              <p key={set.id}>
                <Link to={set.name}>{set.name}</Link>
              </p>
            ))}
          </>
        )}
      </section>

      <Link to="/">Home</Link>
    </>
  )
}

export default Sets
