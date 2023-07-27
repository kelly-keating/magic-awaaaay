import { Link, Outlet } from 'react-router-dom'

function Dash() {
  return (
    <>
      <h1>Dash</h1>
      <section>
        <Link to="/sets">
          <div>Sets</div>
        </Link>
        <Link to="/cards">
          <div>Cards</div>
        </Link>
      </section>

      <div>
        <Link to="/cards">Search</Link> for a specific card or view your{' '}
        <Link to="/collection">collection</Link>
      </div>
      <Outlet />
    </>
  )
}

export default Dash
