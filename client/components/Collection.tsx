import { Heading } from '@chakra-ui/react'
import { Link } from './utils'

function Collection() {
  const renderSet = (name: string) => (
    <>
      <Heading as="h3">{name}</Heading>
      <p>Card 1</p>
      <p>Card 2</p>
      <p>Card 3</p>
    </>
  )
  return (
    <>
      <section>
        <Heading as="h2">My Collection</Heading>
        <p>Look at all your pretty cards</p>
      </section>

      <section>
        {renderSet('ixalan')}
        {renderSet('rivals')}
        {renderSet('war of the spark')}
      </section>

      <Link to="/">Home</Link>
    </>
  )
}

export default Collection
