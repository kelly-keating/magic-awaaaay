import { Heading } from '@chakra-ui/layout'
import { Link, Outlet } from 'react-router-dom'
import Login from './Login'

function Dash() {
  return (
    <>
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

      <Outlet />
    </>
  )
}

export default Dash
