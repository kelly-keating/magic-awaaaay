import { useAuth0 } from '@auth0/auth0-react'
import { Link, Outlet } from 'react-router-dom'

function Dash() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

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

      {(isAuthenticated && user) ? (
        <>
          <button onClick={() => logout()}>Logout</button>
          <img src={user.picture} alt={user.nickname + ' icon'} />
          <p>{user.nickname}</p>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}

      <Outlet />
    </>
  )
}

export default Dash
