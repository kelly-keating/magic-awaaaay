import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Set } from '../../models/sets'

interface Props {
  block: [string, Set[]]
}

function Block({ block }: Props) {
  const [name, sets] = block
  const [visible, setVisible] = useState(false)

  return (
    <>
      <h4
        onClick={() => {
          setVisible(!visible)
        }}
      >
        {name}
      </h4>
      {visible &&
        sets.map((set) => (
          <p key={set.id}>
            <Link to={set.name}>{set.name}</Link>
          </p>
        ))}
    </>
  )
}

export default Block
