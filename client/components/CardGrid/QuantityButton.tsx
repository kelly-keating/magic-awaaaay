import { Button } from '@chakra-ui/react'
import { Star, CheckCircle } from '../utils'

interface Props {
  count: number | undefined
  foil?: boolean
  addOne: (addToFoil: boolean) => void
}

function QuantityButton({ count = 0, foil = false, addOne }: Props) {
  return (
    <Button
      variant="ghost"
      size="sm"
      colorScheme="blue"
      rightIcon={
        foil ? (
          <Star color={count ? 'orange' : 'darkgray'} />
        ) : (
          <CheckCircle color={count ? 'forestgreen' : 'darkgray'} />
        )
      }
      onClick={() => addOne(foil)}
    >
      {count ? count : ' '}
    </Button>
  )
}

export default QuantityButton
