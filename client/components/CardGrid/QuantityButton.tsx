import { Button } from '@chakra-ui/react'
import { StarIcon, CheckCircleIcon } from '../utils'

interface Props {
  count: number | undefined
  foil?: boolean
}

function QuantityButton({ count = 0, foil = false }: Props) {
  return (
    <Button
      variant="ghost"
      size="sm"
      colorScheme="blue"
      rightIcon={
        foil ? (
          <StarIcon color={count ? 'orange' : 'darkgray'} />
        ) : (
          <CheckCircleIcon color={count ? 'forestgreen' : 'darkgray'} />
        )
      }
    >
      {count ? count : ' '}
    </Button>
  )
}

export default QuantityButton
