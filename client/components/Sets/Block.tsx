import { Set } from '../../../models/sets'
import SetListing from './SetListing'
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion'
import { Box, Heading } from '@chakra-ui/layout'

interface Props {
  block: [string, Set[]]
}

function Block({ block }: Props) {
  const [name, sets] = block

  return (
    <AccordionItem>
      <Heading as="h3">
        <AccordionButton>
          <Box>
            {name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>
        {sets.map((set) => <SetListing key={set.id} set={set} />)}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default Block
