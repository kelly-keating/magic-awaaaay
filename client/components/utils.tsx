import * as rrd from 'react-router-dom'
import * as chakra from '@chakra-ui/react'
import * as icons from '@chakra-ui/icons'

// TODO: Does @chakra-ui/react make most of this irrelevant? Can they all be imported directly from there instead?

interface LinkProps {
  children: React.ReactNode
  to: string
  color?: string
}
export function Link({ children, to, color = 'teal.500' }: LinkProps) {
  return (
    <chakra.Link as={rrd.Link} to={to} color={color}>
      {children}
    </chakra.Link>
  )
}

export const Tile = chakra.Card
export const TileHeader = chakra.CardHeader
export const TileBody = chakra.CardBody
export const TileFooter = chakra.CardFooter

export const CheckCircleIcon = icons.CheckCircleIcon
export const StarIcon = icons.StarIcon
export const ChevronDownIcon = icons.ChevronDownIcon
