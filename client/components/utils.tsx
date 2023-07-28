import * as rrd from 'react-router-dom'
import * as chakraLayout from '@chakra-ui/layout'
import * as chakraImage from '@chakra-ui/image'
import * as chakraButton from '@chakra-ui/button'
import * as chakraCard from '@chakra-ui/card'

interface LinkProps {
  children: React.ReactNode
  to: string,
  color?: string,
}
export function Link({ children, to, color= 'teal.500' }: LinkProps) {
  return (
    <chakraLayout.Link as={rrd.Link} to={to} color={color}>
        {children}
    </chakraLayout.Link>
  )
}

export const Button = chakraButton.Button
export const Image = chakraImage.Image

export const Box = chakraLayout.Box
export const Divider = chakraLayout.Divider
export const Heading = chakraLayout.Heading

export const Tile = chakraCard.Card
export const TileHeader = chakraCard.CardHeader
export const TileBody = chakraCard.CardBody
export const TileFooter = chakraCard.CardFooter