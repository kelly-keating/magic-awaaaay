import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { Heading } from '@chakra-ui/react'
import { Link } from './utils'
import Login from './Login'

function Dash() {
  const { user } = useAuth0()

  return (
    <>
      <header>
        <Link to="/">
          <Heading as="h1">Magic awaaaay!</Heading>
        </Link>
        <nav>
          <Link to="/sets">Sets</Link>
          <Link to="/">Search cards</Link>
          {user && <Link to="/collection">Collection</Link>}
        </nav>
        <Login />
      </header>

      <Outlet />
    </>
  )
}

export default Dash
