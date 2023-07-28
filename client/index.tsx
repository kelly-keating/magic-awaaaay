import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Auth0Provider } from '@auth0/auth0-react'
import { ChakraProvider } from '@chakra-ui/react'

import routes from './routes'

// TODO: replace deprecated redirectUri
// TODO: redirectUri (config in auth0?) is not working
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="dev-kelly.au.auth0.com"
      clientId="f5HswUt5Q5lpGBLzgPQRtK6LLD8rpSvx"
      redirectUri={window.location.origin}
      audience="https://magic-awaaaay/api"
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ChakraProvider>
        <RouterProvider router={routes} />
      </ChakraProvider>
    </Auth0Provider>,
  )
})
