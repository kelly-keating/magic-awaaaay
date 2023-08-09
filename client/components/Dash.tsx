import { Outlet } from 'react-router-dom'

import { Heading } from '@chakra-ui/react'
import { Link } from './utils'
import Login from './Login'

function Dash() {
  return (
    <>
      <header>
        <Link to="/">
        <Heading as="h1">Dash</Heading>
        </Link>
        <nav>
          <div>
            <Link to="/sets">
              <div>Sets</div>
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
