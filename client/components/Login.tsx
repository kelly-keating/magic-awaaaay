import { useAuth0 } from '@auth0/auth0-react'

import { Avatar, Button } from './utils'

function Login() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <section>
      {isAuthenticated && user ? (
        <>
          <Avatar src={user.picture} name={user.nickname} />
          <Button onClick={() => logout()}>Logout</Button>
        </>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </section>
  )
}

export default Login
