import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'

function Login() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <section>
      {isAuthenticated && user ? (
        <>
          <Button onClick={() => logout()}>Logout</Button>
          <Image src={user.picture} alt={user.nickname + ' icon'} />
          <p>{user.nickname}</p>
        </>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </section>
  )
}

export default Login
