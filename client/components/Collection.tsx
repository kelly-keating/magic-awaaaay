import { Link } from 'react-router-dom'

function Collection() {
  const renderSet = (name: string) => (
    <>
      <h3>{name}</h3>
      <p>Card 1</p>
      <p>Card 2</p>
      <p>Card 3</p>
    </>
  )
  return (
    <>
      <section>
        <h2>My Collection</h2>
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
