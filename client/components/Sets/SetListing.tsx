import { Set } from '../../../models/sets'
import { Link } from 'react-router-dom'

import { Image } from '@chakra-ui/react'

interface Props {
  set: Set
}

function SetListing({ set }: Props) {
  return (
    <div style={{ display: 'flex' }}>
      <Image
        src={set.icon_svg_uri}
        alt={set.name + ' logo'}
        fallbackSrc="/mtg_icon.png"
        style={{ maxHeight: '50px', maxWidth: '50px' }}
      />
      <p>
        <Link to={set.name}>{set.name}</Link>
      </p>
    </div>
  )
}

export default SetListing
