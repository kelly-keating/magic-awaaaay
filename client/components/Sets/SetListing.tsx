import { Set } from '../../../models/sets'
import { Link } from 'react-router-dom'

import { Image } from '@chakra-ui/react'
import { Tile } from '../utils'

interface Props {
  set: Set
}

function SetListing({ set }: Props) {
  // TODO: make whole tile clickable
  return (
    <Tile
      width="100px"
      margin="1"
      textAlign="center"
      justifyContent="space-around"
      alignItems="center"
    >
      <Image
        src={set.icon_svg_uri}
        alt={set.name + ' logo'}
        fallbackSrc="/mtg_icon.png"
        style={{ maxHeight: '50px', maxWidth: '50px' }}
      />
      <p>
        <Link to={'/sets/' + set.name}>{set.name}</Link>
      </p>
    </Tile>
  )
}

export default SetListing
