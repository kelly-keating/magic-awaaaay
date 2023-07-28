import { Outlet } from 'react-router-dom'

import { Heading, Link } from './utils'
import Login from './Login'

function Dash() {
  return (
    <>
      <header>
        <Heading as="h1">Dash</Heading>
        <nav>
          <div>
            <Link to="/sets">
              <div>Sets</div>
            </Link>
            <Link to="/cards">
              <div>Cards</div>
            </Link>
          </div>

          <div>
            <Link to="/cards">Search</Link> for a specific card or view your{' '}
            <Link to="/collection">collection</Link>
          </div>
        </nav>
        <Login />
      </header>

      <Outlet />
    </>
  )
}

export default Dash
