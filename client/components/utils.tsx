import * as rrd from 'react-router-dom'
import * as chakraAccordion from '@chakra-ui/accordion'
import * as chakraAvatar from '@chakra-ui/avatar'
import * as chakraButton from '@chakra-ui/button'
import * as chakraCard from '@chakra-ui/card'
import * as chakraImage from '@chakra-ui/image'
import * as chakraLayout from '@chakra-ui/layout'

// TODO: Does @chakra-ui/react make most of this irrelevant? Can they all be imported directly from there instead?

interface LinkProps {
  children: React.ReactNode
  to: string
  color?: string
}
export function Link({ children, to, color = 'teal.500' }: LinkProps) {
  return (
    <chakraLayout.Link as={rrd.Link} to={to} color={color}>
      {children}
    </chakraLayout.Link>
  )
}

export const Button = chakraButton.Button
export const Image = chakraImage.Image
export const Avatar = chakraAvatar.Avatar

export const Box = chakraLayout.Box
export const Divider = chakraLayout.Divider
export const Flex = chakraLayout.Flex
export const Heading = chakraLayout.Heading
export const Spacer = chakraLayout.Spacer

export const Tile = chakraCard.Card
export const TileHeader = chakraCard.CardHeader
export const TileBody = chakraCard.CardBody
export const TileFooter = chakraCard.CardFooter

export const Accordion = chakraAccordion.Accordion
export const AccordionItem = chakraAccordion.AccordionItem
export const AccordionButton = chakraAccordion.AccordionButton
export const AccordionPanel = chakraAccordion.AccordionPanel
export const AccordionIcon = chakraAccordion.AccordionIcon
