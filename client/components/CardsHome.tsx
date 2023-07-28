import { Heading } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'

function Cards() {
  return (
    <>
      <section>
        <Heading as="h2">Cards</Heading>
        <p>Search a card</p>
      </section>

      <section>filters filters filters</section>

      <section>Cards go here....</section>

      <Link to="/">Home</Link>
    </>
  )
}

export default Cards
