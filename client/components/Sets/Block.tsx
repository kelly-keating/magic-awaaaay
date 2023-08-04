import { Set } from '../../../models/sets'

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'
import SetListing from './SetListing'

interface Props {
  block: [string, Set[]]
}

function Block({ block }: Props) {
  const [name, sets] = block

  return (
    <AccordionItem>
      <Heading as="h3">
        <AccordionButton>
          <Box>{name}</Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        <Flex wrap="wrap" justifyContent="center">
          {sets.map((set) => (
            <SetListing key={set.id} set={set} />
          ))}
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Block
