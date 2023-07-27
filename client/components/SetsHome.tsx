import { Link } from 'react-router-dom'
import * as Models from '../../models/sets'
import Block from './SetBlock'
import { getAllSets } from '../api'
import { useEffect, useState } from 'react'

type BlocksObj = Record<string, Models.Set[]>

function Sets() {
  const [core, setCore] = useState([] as Models.Set[])
  const [blocks, setBlocks] = useState({} as BlocksObj)

  useEffect(() => {
    getAllSets()
      .then((sets) => {
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
        <h1>Sets</h1>
        <h2>View cards under each set</h2>
      </section>

      <section>
        {!core.length && <p>loading</p>}
        {core.length && <Block block={['Core', core]} />}
        {Object.entries(blocks).map((block) => (
          <Block key={block[0]} block={block} />
        ))}
      </section>

      <Link to="/">Home</Link>
    </>
  )
}

export default Sets
